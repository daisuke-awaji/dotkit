import {
  Alert,
  Button,
  Card,
  Dialog,
  DotIcon,
  Skeleton,
  StatusDot,
  Typing,
} from "dotkit/react";
import { Example } from "../../ui";
import { Since } from "./shared";
import { useRef } from "react";
import { useT } from "../../i18n";

function DialogDemo() {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <Button onClick={() => ref.current?.showModal()}>Delete project</Button>
      <Dialog ref={ref} aria-labelledby="demo-dialog-title">
        <h2 id="demo-dialog-title" style={{ margin: "0 0 8px", fontSize: 20 }}>Delete project?</h2>
        <p className="muted" style={{ margin: 0, fontSize: 14 }}>This permanently deletes <b>dotkit-docs</b> and its 42 deployments. This cannot be undone.</p>
        <form method="dialog" className="dk-dialog__actions">
          <Button variant="outline" value="cancel">Cancel</Button>
          <Button value="ok">Delete</Button>
        </form>
      </Dialog>
    </>
  );
}

export function Feedback() {
  const t = useT();
  return (
    <>
      <h2 id="feedback">Feedback</h2>
      <p className="muted">{t(<>状態や進み具合を伝える部品。</>, <>Parts that communicate state and progress.</>)}</p>

      <h3 id="alert">Alert <Since v="0.4" /></h3>
      <p>
        {t(
          <>
            薄く色を敷いたお知らせ欄です。左端に、右へ消えていくドットの帯が付きます。<code>data-state</code> は
            <code>info</code>（既定）/ <code>ok</code> / <code>warn</code> / <code>danger</code> で、<code>danger</code> だけ四角いドットになります。
            すぐに知らせる必要があるものには <code>role="alert"</code>、控えめなものには <code>role="status"</code> を付けてください。
          </>,
          <>
            A notice box with a light tint and a band of dots on the left that fades to the right. <code>data-state</code> is
            <code>info</code> (default) / <code>ok</code> / <code>warn</code> / <code>danger</code>; only <code>danger</code> uses square dots.
            Add <code>role="alert"</code> for anything urgent and <code>role="status"</code> for quieter messages.
          </>,
        )}
      </p>
      <Example
        align="left"
        previewStyle={{ display: "grid", gap: 12 }}
        html={`<div class="dk-alert" role="status">
  <p class="dk-alert__title">New version available</p>
  dotkit v0.4.0 adds tabs, dialogs and patterns.
</div>
<div class="dk-alert" data-state="danger" role="alert">
  <p class="dk-alert__title">Deploy failed</p>
  Build exited with code 1.
</div>`}
        react={`<Alert title="New version available" role="status">dotkit v0.4.0 adds tabs, dialogs and patterns.</Alert>
<Alert state="ok" title="Deployed" icon={<DotIcon name="check" step={2} />}>Production is live.</Alert>
<Alert state="warn" title="Degraded performance">p95 latency is above 800ms.</Alert>
<Alert state="danger" title="Deploy failed" role="alert">Build exited with code 1.</Alert>`}
      >
        <Alert title="New version available" icon={<DotIcon name="info" step={2} />}>dotkit v0.4.0 adds tabs, dialogs and patterns.</Alert>
        <Alert state="ok" title="Deployed" icon={<DotIcon name="check" step={2} />}>Production is live at dotkit.dev.</Alert>
        <Alert state="warn" title="Degraded performance" icon={<DotIcon name="alert" step={2} />}>p95 latency is above 800ms in ap-northeast-1.</Alert>
        <Alert state="danger" title="Deploy failed" icon={<DotIcon name="close" step={2} />}>Build exited with code 1. See the logs for details.</Alert>
      </Example>

      <h3 id="dialog">Dialog <Since v="0.4" /></h3>
      <p>
        {t(
          <>
            ネイティブの <code>&lt;dialog&gt;</code> にドットの枠を付け、背景をドットの幕で覆います。開閉・フォーカスの閉じ込め・Esc での終了はブラウザの機能をそのまま使います。
            <code>showModal()</code> で開き、<code>&lt;form method="dialog"&gt;</code> のボタンで閉じられます。下にボタンを並べるときは <code>.dk-dialog__actions</code> が使えます。
          </>,
          <>
            A native <code>&lt;dialog&gt;</code> with a dotted frame and a dotted backdrop. Opening, closing, focus trapping and Esc all come from the browser.
            Open it with <code>showModal()</code> and close it with a button in <code>&lt;form method="dialog"&gt;</code>. Use <code>.dk-dialog__actions</code> to line up buttons at the bottom.
          </>,
        )}
      </p>
      <Example
        html={`<button class="dk-btn dk-btn--solid" onclick="document.getElementById('d').showModal()">Delete project</button>

<dialog id="d" class="dk-dialog" aria-labelledby="d-title">
  <h2 id="d-title">Delete project?</h2>
  <p>This cannot be undone.</p>
  <form method="dialog" class="dk-dialog__actions">
    <button class="dk-btn dk-btn--outline" value="cancel">Cancel</button>
    <button class="dk-btn dk-btn--solid" value="ok">Delete</button>
  </form>
</dialog>`}
        react={`const ref = useRef<HTMLDialogElement>(null);

<Button onClick={() => ref.current?.showModal()}>Delete project</Button>
<Dialog ref={ref} aria-labelledby="d-title">
  <h2 id="d-title">Delete project?</h2>
  <p>This cannot be undone.</p>
  <form method="dialog" className="dk-dialog__actions">
    <Button variant="outline" value="cancel">Cancel</Button>
    <Button value="ok">Delete</Button>
  </form>
</Dialog>`}
      >
        <DialogDemo />
      </Example>

      <h3 id="status">Status dot <Since v="0.3" /></h3>
      <p>
        {t(
          <>
            状態を表す 1 つのドットと、その説明文です。<code>data-state</code> は <code>ok</code> / <code>warn</code> / <code>down</code> / <code>info</code> / <code>idle</code>。
            色だけに頼らないよう、<code>down</code> は四角、<code>idle</code> は輪の形になります。説明文は必ず中に書いてください。
            <code>.dk-status--pulse</code> で波紋が広がります（「動きを減らす」設定では止まります）。
          </>,
          <>
            A single dot showing a state, with a caption. <code>data-state</code> is <code>ok</code> / <code>warn</code> / <code>down</code> / <code>info</code> / <code>idle</code>.
            So that color is never the only signal, <code>down</code> is a square and <code>idle</code> a ring. Always put the caption inside.
            <code>.dk-status--pulse</code> adds a spreading ripple (it stops under reduced motion).
          </>,
        )}
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

      <h3 id="typing">Typing indicator <Since v="0.2" /></h3>
      <p>
        {t(
          <>
            チャットの「入力中…」です。3 つのドットが順に跳ねます。<code>.dk-typing--bubble</code> を付けると吹き出しの背景が付きます。
            <code>role="status"</code> と名前を付けてください（React 版は自動で付きます）。「動きを減らす」設定のときは止まります。
          </>,
          <>
            The chat “typing…” indicator: three dots bounce in turn. <code>.dk-typing--bubble</code> adds a speech-bubble background.
            Give it <code>role="status"</code> and a name (the React version adds both). It stops under reduced motion.
          </>,
        )}
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

      <h3 id="skeleton">Skeleton <Since v="0.3" /></h3>
      <p>
        {t(
          <>
            読み込み中の仮表示です。ドット面の上を、明るさの帯がゆっくり通り過ぎます。
            <code>.dk-skeleton--text</code> は 1 行分、<code>.dk-skeleton--circle</code> はアバター用の円です。
            装飾なので <code>aria-hidden</code> を付け、読み込み中の領域に <code>aria-busy="true"</code> を付けてください。
          </>,
          <>
            A loading placeholder: a band of light drifts slowly across a dot surface.
            <code>.dk-skeleton--text</code> is one line of text; <code>.dk-skeleton--circle</code> is a circle for avatars.
            It is decorative, so add <code>aria-hidden</code>, and put <code>aria-busy="true"</code> on the region that is loading.
          </>,
        )}
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
