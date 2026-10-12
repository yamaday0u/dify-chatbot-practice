import { BubblePage } from './pages/BubblePage'
import { IframePage } from './pages/IframePage'

// ルーターは使わず、パスでページを切り替える
// （通常の <a> で遷移してページを再読み込みし、バブルのスクリプトを確実に破棄する）
const pages = [
  { path: '/', label: 'チャットバブル', Component: BubblePage },
  { path: '/iframe', label: 'iframe 統合', Component: IframePage },
]

function App() {
  const current = pages.find((page) => page.path === window.location.pathname) ?? pages[0]

  return (
    <main className="mx-auto max-w-180 px-4 py-8">
      <nav className="flex gap-4 border-b border-gray-500/30 pb-3">
        {pages.map(({ path, label }) => (
          <a
            key={path}
            href={path}
            aria-current={path === current.path ? 'page' : undefined}
            className="text-blue-600 underline aria-[current=page]:font-bold aria-[current=page]:no-underline"
          >
            {label}
          </a>
        ))}
      </nav>
      <current.Component />
    </main>
  )
}

export default App
