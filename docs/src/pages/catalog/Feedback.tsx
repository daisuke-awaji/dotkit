import {
  Card,
  DotIcon,
  Skeleton,
  StatusDot,
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

      <h3 id="status">Status dot <Since v="0.3" /></h3>
      <p>
        状態を表す 1 つのドットと、その説明文です。<code>data-state</code> は <code>ok</code> / <code>warn</code> / <code>down</code> / <code>info</code> / <code>idle</code>。
        色だけに頼らないよう、<code>down</code> は四角、<code>idle</code> は輪の形になります。説明文は必ず中に書いてください。
        <code>.dk-status--pulse</code> で波紋が広がります（「動きを減らす」設定では止まります）。
      </p>
      <Example
        align="left"
        previewStyle={{ gap: 28 }}
        html={`<span class="dk-status">Operational</span>
<span class="dk-status" data-state="warn">Degraded</span>
<span class="dk-status" data-state="down">Outage</span>
<span class="dk-status" data-state="idle">Paused</span>
<span class="dk-status dk-status--pulse" data-state="info">Deploying</span>`}
        react={`<StatusDot>Operational</StatusDot>
<StatusDot state="warn">Degraded</StatusDot>
<StatusDot state="down">Outage</StatusDot>
<StatusDot state="idle">Paused</StatusDot>
<StatusDot state="info" pulse>Deploying</StatusDot>`}
      >
        <StatusDot>Operational</StatusDot>
        <StatusDot state="warn">Degraded</StatusDot>
        <StatusDot state="down">Outage</StatusDot>
        <StatusDot state="idle">Paused</StatusDot>
        <StatusDot state="info" pulse>Deploying</StatusDot>
        <StatusDot pulse>Live</StatusDot>
      </Example>

      <h3 id="skeleton">Skeleton <Since v="0.3" /></h3>
      <p>
        読み込み中の仮表示です。ドット面の上を、明るさの帯がゆっくり通り過ぎます。
        <code>.dk-skeleton--text</code> は 1 行分、<code>.dk-skeleton--circle</code> はアバター用の円です。
        装飾なので <code>aria-hidden</code> を付け、読み込み中の領域に <code>aria-busy="true"</code> を付けてください。
      </p>
      <Example
        html={`<div aria-busy="true">
  <div class="dk-skeleton dk-skeleton--circle" aria-hidden="true"></div>
  <div aria-hidden="true">
    <div class="dk-skeleton dk-skeleton--text"></div>
    <div class="dk-skeleton dk-skeleton--text"></div>
  </div>
  <div class="dk-skeleton" style="height: 120px" aria-hidden="true"></div>
</div>`}
        react={`<div aria-busy="true">
  <Skeleton circle />
  <Skeleton lines={3} />
  <Skeleton height={120} />
</div>`}
      >
        <Card style={{ width: 320 }} aria-busy="true">
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Skeleton circle />
            <Skeleton lines={2} style={{ flex: 1 }} />
          </div>
          <Skeleton height={120} style={{ marginTop: 16 }} />
          <Skeleton lines={3} style={{ marginTop: 10 }} />
        </Card>
      </Example>
    </>
  );
}
