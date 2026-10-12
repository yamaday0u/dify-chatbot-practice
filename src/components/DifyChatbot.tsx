import { useEffect } from 'react'

/**
 * Dify チャットバブルウィジェットの設定
 * https://docs.dify.ai/ja/cloud/use-dify/publish/webapp/embedding-in-websites
 */
export type DifyChatbotConfig = {
  /** アクセスポイントのトークン（必須） */
  token: string
  /** 接続先のベース URL（Dify Cloud なら https://udify.app） */
  baseUrl?: string
  isDev?: boolean
  /** script を動的に挿入する場合は true（SPA から読み込むため必須） */
  dynamicScript?: boolean
  containerProps?: {
    style?: React.CSSProperties | string
    className?: string
  }
  draggable?: boolean
  dragAxis?: 'x' | 'y' | 'both'
  /** Dify アプリの入力変数（変数名: 値） */
  inputs?: Record<string, string>
  /** システム変数（user_id, conversation_id など） */
  systemVariables?: Record<string, string>
  /** ユーザープロフィール（avatar_url, name など） */
  userVariables?: Record<string, string>
}

declare global {
  interface Window {
    difyChatbotConfig?: DifyChatbotConfig
  }
}

const DEFAULT_BASE_URL = 'https://udify.app'

/** 埋め込みスクリプトが生成する要素の ID */
const WIDGET_ELEMENT_IDS = ['dify-chatbot-bubble-button', 'dify-chatbot-bubble-window']

type Props = Omit<DifyChatbotConfig, 'dynamicScript'>

export function DifyChatbot({ baseUrl = DEFAULT_BASE_URL, ...config }: Props) {
  const { token } = config
  // config はオブジェクトなので、内容の変化を文字列で検知する
  const configJson = JSON.stringify(config)

  useEffect(() => {
    if (!token) return

    window.difyChatbotConfig = { ...JSON.parse(configJson), baseUrl, dynamicScript: true }

    const script = document.createElement('script')
    script.src = `${baseUrl}/embed.min.js`
    script.id = token
    script.defer = true
    document.body.appendChild(script)

    return () => {
      // StrictMode の二重実行やアンマウント時に重複しないよう後片付け
      script.remove()
      WIDGET_ELEMENT_IDS.forEach((id) => document.getElementById(id)?.remove())
      delete window.difyChatbotConfig
    }
  }, [token, baseUrl, configJson])

  return null
}
