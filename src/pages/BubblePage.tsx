import { DifyChatbot } from "../components/DifyChatbot";
import { TokenWarning } from "../components/TokenWarning";

const token = import.meta.env.VITE_DIFY_TOKEN;
const baseUrl = import.meta.env.VITE_DIFY_BASE_URL || undefined;

export function BubblePage() {
  return (
    <>
      <h1 className="my-6 text-3xl font-bold">チャットバブル</h1>
      <p className="my-4">
        右下のチャットバブルをクリックすると Dify のチャットボットが開きます。
      </p>

      {!token && <TokenWarning />}

      <DifyChatbot
        token={token}
        baseUrl={baseUrl}
        systemVariables={
          {
            // user_id: 'demo-user',
          }
        }
        userVariables={
          {
            // name: 'Demo User',
            // avatar_url: 'https://example.com/avatar.png',
          }
        }
      />
    </>
  );
}
