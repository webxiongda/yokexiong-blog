import { NotionAPI } from 'notion-client'

export const notion = new NotionAPI({
  apiBaseUrl: process.env.NOTION_API_BASE_URL
})

const DEFAULT_TIMEOUT_MS = 30_000
const DEFAULT_RETRY_COUNT = 3
const DEFAULT_RETRY_DELAY_MS = 800

type GetPageOptions = Parameters<typeof notion.getPage>[1]

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getNotionPage(
  pageId: string,
  opts?: GetPageOptions
): Promise<Awaited<ReturnType<typeof notion.getPage>>> {
  const ofetchOptions = {
    timeout: DEFAULT_TIMEOUT_MS,
    ...(opts?.ofetchOptions || {})
  }

  let lastError: unknown

  for (let attempt = 1; attempt <= DEFAULT_RETRY_COUNT; attempt += 1) {
    try {
      return await notion.getPage(pageId, {
        ...opts,
        ofetchOptions
      })
    } catch (error) {
      lastError = error

      if (attempt === DEFAULT_RETRY_COUNT) {
        break
      }

      const delayMs = DEFAULT_RETRY_DELAY_MS * 2 ** (attempt - 1)
      console.warn(
        `notion getPage failed for "${pageId}" (attempt ${attempt}/${DEFAULT_RETRY_COUNT})`,
        error
      )
      await sleep(delayMs)
    }
  }

  throw lastError
}
