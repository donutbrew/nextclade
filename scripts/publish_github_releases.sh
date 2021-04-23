#!/usr/bin/env bash

BASH_DEBUG="${BASH_DEBUG:=}"
[[ "${BASH_DEBUG}" == "true" ]] && set -o xtrace
set -o errexit
set -o nounset
set -o pipefail
shopt -s dotglob
trap "exit" INT

: "${GITHUB_TOKEN}"
: "${CIRCLE_PROJECT_USERNAME}"
: "${CIRCLE_PROJECT_REPONAME}"
: "${CIRCLE_SHA1}"

PROJECT_NAME=${1}
if [ -z "${PROJECT_NAME}" ]; then
  echo "${0}: Error: project name is required"
  echo "Usage: ${0} <project_name>"
  exit 1
fi

export ARTIFACTS=".out/bin/${PROJECT_NAME}*"
export VERSION=$(cat packages/${PROJECT_NAME}_cli/VERSION)
export TAG="${PROJECT_NAME}-${VERSION}"

PATH="${PATH}:."

ghr \
  -token ${GITHUB_TOKEN} \
  -username ${CIRCLE_PROJECT_USERNAME} \
  -repository ${CIRCLE_PROJECT_REPONAME} \
  -commitish ${CIRCLE_SHA1} \
  -replace \
  ${TAG} \
  ${ARTIFACTS}
