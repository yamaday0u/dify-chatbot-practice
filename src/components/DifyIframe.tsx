import { useEffect, useState } from 'react'
import { buildDifyChatbotUrl, type DifyUrlOptions } from '../lib/difyUrl'

/**
 * Dify の Web アプリを iframe で埋め込むコンポーネント
 * https://docs.dify.ai/ja/cloud/use-dify/publish/webapp/embedding-in-websites#iframe-統合
 */
type Props = DifyUrlOptions & {
  title?: string
  className?: string
}

export function DifyIframe({ title = 'Dify chatbot', className, ...options }: Props) {
  const [src, setSrc] = useState<string>()
  // options はオブジェクトなので、内容の変化を文字列で検知する
  const optionsJson = JSON.stringify(options)

  useEffect(() => {
    if (!options.token) return

    // URL パラメータのエンコードは非同期なので、古い結果で上書きしないようにする
    let cancelled = false
    buildDifyChatbotUrl(JSON.parse(optionsJson)).then((url) => {
      if (!cancelled) setSrc(url)
    })
    return () => {
      cancelled = true
    }
  }, [options.token, optionsJson])

  if (!src) return null

  return (
    <iframe
      src={src}
      title={title}
      className={className}
      allow="fullscreen; microphone; clipboard-write"
    />
  )
}
