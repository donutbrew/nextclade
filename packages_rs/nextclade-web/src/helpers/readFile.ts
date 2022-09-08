/* eslint-disable no-loops/no-loops */
import chardet from 'chardet'
import { sortBy } from 'lodash'
import { sanitizeError } from 'src/helpers/sanitizeError'

export class FileReaderError extends Error {
  public readonly file: File

  constructor(file: File, message?: string) {
    let err = `File cannot be read: "${file.name}" (size: ${file?.size ?? 0} bytes)`
    if (message) {
      err = `File cannot be read: ${message}: "${file.name}" (size: ${file?.size ?? 0} bytes)`
    }
    super(err)
    this.file = file
  }
}

export class FileReaderEncodingError extends FileReaderError {
  public readonly file: File

  constructor(file: File, message?: string) {
    let err = `Please try to convert your file to ASCII or UTF-8 and try again!`
    if (message) {
      err = `${message}. ${err}`
    }
    super(file, err)
    this.file = file
  }
}

export function readFile(file: File): Promise<string> {
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.addEventListener('error', (event) => {
      reader.abort()
      const message = event.target?.error?.message
      reject(new FileReaderError(file, message))
    })

    reader.addEventListener('load', (event) => {
      const buf = event?.target?.result
      const isArrayBuffer = buf instanceof ArrayBuffer
      if (!buf || !isArrayBuffer) {
        return reject(new FileReaderError(file, 'Result is empty'))
      }
      const bytes = new Uint8Array(buf)
      const encodings = sortBy(chardet.analyse(bytes), (enc) => -enc.confidence)

      if (encodings.length === 0) {
        return reject(new FileReaderEncodingError(file, 'Unable detect file encoding'))
      }

      for (const { name: encoding } of encodings) {
        try {
          const decoder = new TextDecoder(encoding)
          const content = decoder.decode(bytes)

          if (!content || !content?.length) {
            return reject(new FileReaderEncodingError(file, 'File contents is empty'))
          }

          return resolve(content)
        } catch (error_: unknown) {
          const error = sanitizeError(error_)
          console.warn(`When converting file encoding from ${encoding} to UTF-8: ${error.message}`)
        }
      }

      const encodingsList = encodings.map((enc) => enc.name).join(', ')
      return reject(
        new FileReaderEncodingError(
          file,
          `Unable detect file encoding. Attempted to convert from the following encodings: ${encodingsList}`,
        ),
      )
    })

    reader.readAsArrayBuffer(file)
  })
}
