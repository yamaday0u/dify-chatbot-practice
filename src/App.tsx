import { DifyChatbot } from './components/DifyChatbot'

const token = import.meta.env.VITE_DIFY_TOKEN
const baseUrl = import.meta.env.VITE_DIFY_BASE_URL || undefined

function App() {
  return (
    <main className="container">
      <h1>Dify Chatbot Practice</h1>
      <p>右下のチャットバブルをクリックすると Dify のチャットボットが開きます。</p>

      {!token && (
        <p className="warning">
          <code>VITE_DIFY_TOKEN</code> が未設定です。<code>.env.local</code>{' '}
          にアクセスポイントのトークンを設定して、開発サーバーを再起動してください。
        </p>
      )}

      <DifyChatbot
        token={token}
        baseUrl={baseUrl}
        systemVariables={{
          // user_id: 'demo-user',
        }}
        userVariables={{
          // name: 'Demo User',
          // avatar_url: 'https://example.com/avatar.png',
        }}
      />
    </main>
  )
}

export default App
