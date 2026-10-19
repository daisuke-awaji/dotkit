import {
  DotIcon,
  Typing,
} from "dotkit/react";
import { Example } from "../../ui";
import { Since } from "./shared";

export function Feedback() {
  return (
    <>
      <h2 id="feedback">Feedback</h2>
      <p className="muted">状態や進み具合を伝える部品。</p>

      <h3 id="typing">Typing indicator <Since v="0.2" /></h3>
      <p>
        チャットの「入力中…」です。3 つのドットが順に跳ねます。<code>.dk-typing--bubble</code> を付けると吹き出しの背景が付きます。
        <code>role="status"</code> と名前を付けてください（React 版は自動で付きます）。「動きを減らす」設定のときは止まります。
      </p>
      <Example
        html={`<span class="dk-typing" role="status" aria-label="Assistant is typing">
  <i></i><i></i><i></i>
</span>

<span class="dk-typing dk-typing--bubble" role="status" aria-label="Assistant is typing">
  <i></i><i></i><i></i>
</span>`}
        react={`<Typing label="Assistant is typing" />
<Typing bubble label="Assistant is typing" />
<Typing size={4} />`}
      >
        <Typing label="Assistant is typing" />
        <Typing bubble label="Assistant is typing" />
        <Typing size={4} />
        <div className="chat-row">
          <span className="avatar"><DotIcon name="star" step={2} /></span>
          <Typing bubble label="Assistant is typing" />
        </div>
      </Example>
    </>
  );
}
