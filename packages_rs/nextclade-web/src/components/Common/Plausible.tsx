/**
 * Taken with modifications from
 * https://github.com/4lejandrito/next-plausible/blob/a8e6c2df06b6e8943017d59903ab54e24667ffe2/index.tsx#L1
 *
 * By 4lejandrito
 */

import React, { useCallback } from 'react'
import Head from 'next/head'
import { get, noop } from 'lodash'

export interface PlausibleProps {
  domain: string
  plausibleDomain?: string
}

export const PLAUSIBLE_DOMAIN_DEFAULT = 'https://plausible.io'

export function Plausible({ domain, plausibleDomain = PLAUSIBLE_DOMAIN_DEFAULT }: PlausibleProps) {
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  const plausibleJs = `${plausibleDomain}/js/plausible.js`

  return (
    <Head>
      <script async defer data-domain={domain} src={plausibleJs} />
    </Head>
  )
}

export interface EventOptions {
  props?: Record<string, unknown>
  callback?: VoidFunction
}

export type PlausibleFunction = (event: string, options?: EventOptions) => void

export function plausible(event: string, options?: EventOptions) {
  const plausibleFunction = get(window, 'plausible', noop) as PlausibleFunction
  plausibleFunction(event, options)
}

export function usePlausible(): PlausibleFunction {
  return useCallback((event: string, options?: EventOptions) => plausible(event, options), [])
}
