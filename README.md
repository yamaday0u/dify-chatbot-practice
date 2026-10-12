# dify-chatbot-practice

[Dify の Web アプリのサイト埋め込み](https://docs.dify.ai/ja/cloud/use-dify/publish/webapp/embedding-in-websites)を React (Vite + TypeScript) で試すための雛形です。

- `/` — チャットバブルウィジェット
- `/iframe` — iframe 統合

## セットアップ

```bash
npm ci
cp .env.example .env.local
# .env.local の VITE_DIFY_TOKEN にトークンを設定
npm run dev
```

トークンは Dify アプリの **アクセスポイント → サイトに埋め込む** に表示されるコードの `token` の値です。

## 構成

- `src/components/DifyChatbot.tsx` — `window.difyChatbotConfig` を設定し `embed.min.js` を読み込むコンポーネント
- `src/index.css` — Tailwind CSS の読み込みと、バブルボタン（CSS 変数）・チャットウィンドウ（ID セレクタ）のスタイル調整。それ以外のスタイルは各コンポーネントで Tailwind のユーティリティクラスを使う
- `src/components/DifyIframe.tsx` — Web アプリの URL を組み立てて iframe で表示するコンポーネント
- `src/lib/difyUrl.ts` — `inputs` / `sys.*` / `user.*` を GZIP + base64 でエンコードして URL パラメータにする処理（`embed.min.js` と同じ方式）
- `src/pages/` — 各パターンのページと `inputs` / `systemVariables` / `userVariables` の指定例
- `src/App.tsx` — パスによるページ切り替え
