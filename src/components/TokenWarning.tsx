export function TokenWarning() {
  return (
    <p className="my-4 rounded-lg border border-amber-500 bg-amber-500/10 px-4 py-3">
      <code>VITE_DIFY_TOKEN</code> が未設定です。<code>.env.local</code>{' '}
      にアクセスポイントのトークンを設定して、開発サーバーを再起動してください。
    </p>
  )
}
