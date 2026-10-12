export const DEFAULT_DIFY_BASE_URL = 'https://udify.app'

export type DifyUrlOptions = {
  token: string
  baseUrl?: string
  /** Dify アプリの入力変数（変数名: 値） */
  inputs?: Record<string, string>
  /** システム変数（user_id, conversation_id など）。URL では `sys.` プレフィックスが付く */
  systemVariables?: Record<string, string>
  /** ユーザープロフィール（avatar_url, name など）。URL では `user.` プレフィックスが付く */
  userVariables?: Record<string, string>
}

/** embed.min.js と同じく、値を GZIP 圧縮して base64 にエンコードする */
async function compressAndEncode(value: string): Promise<string> {
  const stream = new Blob([new TextEncoder().encode(value)])
    .stream()
    .pipeThrough(new CompressionStream('gzip'))
  const bytes = new Uint8Array(await new Response(stream).arrayBuffer())
  return btoa(String.fromCharCode(...bytes))
}

async function encodeEntries(vars: Record<string, string> = {}, prefix = '') {
  return Promise.all(
    Object.entries(vars).map(async ([key, value]) => [prefix + key, await compressAndEncode(value)]),
  )
}

/**
 * Web アプリ（チャットボット）の URL を組み立てる
 * 例: https://udify.app/chatbot/{token}?name=H4sI...&sys.user_id=H4sI...
 */
export async function buildDifyChatbotUrl({
  token,
  baseUrl = DEFAULT_DIFY_BASE_URL,
  inputs,
  systemVariables,
  userVariables,
}: DifyUrlOptions): Promise<string> {
  const params = new URLSearchParams([
    ...(await encodeEntries(inputs)),
    ...(await encodeEntries(systemVariables, 'sys.')),
    ...(await encodeEntries(userVariables, 'user.')),
  ])
  const query = params.toString()
  return `${baseUrl}/chatbot/${token}${query ? `?${query}` : ''}`
}
