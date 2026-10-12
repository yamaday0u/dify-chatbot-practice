# dify-chatbot-practice

[Dify のチャットバブルウィジェット](https://docs.dify.ai/ja/cloud/use-dify/publish/webapp/embedding-in-websites)を React (Vite + TypeScript) で試すための雛形です。

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
- `src/index.css` — バブルボタン（CSS 変数）とチャットウィンドウのスタイル調整
- `src/App.tsx` — `inputs` / `systemVariables` / `userVariables` の指定例
