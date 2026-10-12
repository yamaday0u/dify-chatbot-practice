import { DifyIframe } from '../components/DifyIframe'
import { TokenWarning } from '../components/TokenWarning'

const token = import.meta.env.VITE_DIFY_TOKEN
const baseUrl = import.meta.env.VITE_DIFY_BASE_URL || undefined

export function IframePage() {
  return (
    <>
      <h1 className="my-6 text-3xl font-bold">iframe 統合</h1>
      <p className="my-4">Dify の Web アプリをページ内に直接埋め込んでいます。</p>

      {!token && <TokenWarning />}

      <DifyIframe
        token={token}
        baseUrl={baseUrl}
        className="block h-160 w-full rounded-xl border border-gray-500/30"
        inputs={{
          // name: 'Demo',
        }}
        systemVariables={{
          // user_id: 'demo-user',
        }}
        userVariables={{
          // name: 'Demo User',
        }}
      />
    </>
  )
}
