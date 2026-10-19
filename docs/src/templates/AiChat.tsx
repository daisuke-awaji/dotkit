// Template: AI chat — built only from dotkit components + the CSS below.
import { useRef, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Dialog,
  DotIcon,
  Identicon,
  Input,
  Range,
  RingMeter,
  Skeleton,
  Steps,
  Switch,
  Tab,
  TabList,
  Typing,
} from "dotkit/react";

const css = `
.ai { display: grid; grid-template-columns: 220px 1fr; min-height: 560px; border-radius: 14px; overflow: hidden; }
@media (max-width: 760px) { .ai { grid-template-columns: 1fr; } .ai-side { display: none; } }
.ai-side { display: grid; align-content: start; gap: 12px; padding: 16px; border-right: 1px dotted var(--dk-mute); }
.ai-conv { display: flex; align-items: center; gap: 10px; padding: 8px; border-radius: 8px; font-size: 13px; color: var(--dk-subtle); text-decoration: none; }
.ai-conv[aria-current="page"] { color: var(--dk-ink); background: color-mix(in srgb, var(--dk-ink) 5%, transparent); }
.ai-main { display: grid; grid-template-rows: auto 1fr auto; min-width: 0; }
.ai-top { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 12px 18px; border-bottom: 1px dotted var(--dk-mute); }
.ai-thread { display: grid; align-content: start; gap: 18px; padding: 20px 18px; }
.ai-msg { display: flex; gap: 10px; align-items: flex-start; max-width: 620px; }
.ai-msg.me { margin-left: auto; flex-direction: row-reverse; }
.ai-bubble { padding: 10px 14px; border-radius: 14px; font-size: 14px; line-height: 1.6; background: color-mix(in srgb, var(--dk-ink) 5%, var(--dk-paper)); }
.ai-msg.me .ai-bubble { color: var(--dk-paper); background: var(--dk-ink); }
.ai-bubble pre { margin: 8px 0 0; padding: 10px 12px; border-radius: 8px; font-size: 12px; overflow: auto; background: var(--dk-paper); color: var(--dk-ink); }
.ai-bot { display: inline-grid; place-items: center; flex: none; width: 34px; height: 34px; border-radius: 50%; color: var(--dk-paper); background: var(--dk-ink); }
.ai-compose { display: grid; gap: 10px; padding: 14px 18px 18px; border-top: 1px dotted var(--dk-mute); }
.ai-compose-row { display: flex; gap: 10px; align-items: center; }
.ai-compose-row .dk-field { flex: 1; }
.ai-opts { display: flex; gap: 18px; align-items: center; flex-wrap: wrap; font-size: 13px; }
`;

const conversations = ["Dot grid layout", "Halftone shader", "Release notes v0.4", "Status page copy"];

export default function AiChat() {
  const [tab, setTab] = useState(0);
  const [temp, setTemp] = useState(0.7);
  const share = useRef<HTMLDialogElement>(null);

  return (
    <Card className="ai" style={{ padding: 0 }}>
      <style>{css}</style>

      <aside className="ai-side" aria-label="Conversations">
        <TabList aria-label="Sidebar">
          {["Chats", "Files"].map((t, i) => (
            <Tab key={t} selected={tab === i} onClick={() => setTab(i)}>{t}</Tab>
          ))}
        </TabList>
        {conversations.map((c, i) => (
          <a key={c} href="#/templates" className="ai-conv" aria-current={i === 0 ? "page" : undefined}>
            <Identicon value={c} cell={4} /> {c}
          </a>
        ))}
      </aside>

      <section className="ai-main" aria-label="Chat">
        <div className="ai-top">
          <span style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <b>Dot grid layout</b> <Badge>gpt-dots-1</Badge>
          </span>
          <span style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <RingMeter value={0.62} count={20} size={3} diameter={30} label="Context window 62% used" title="Context 62%" />
            <Button variant="outline" size="sm" onClick={() => share.current?.showModal()}>Share</Button>
          </span>
        </div>

        <div className="ai-thread" aria-live="polite">
          <div className="ai-msg me">
            <Identicon value="you@example.com" cell={6} label="You" />
            <div className="ai-bubble">How do I draw a dotted border that never cuts a dot in half?</div>
          </div>
          <div className="ai-msg">
            <span className="ai-bot"><DotIcon name="star" step={2} /></span>
            <div className="ai-bubble">
              Use a radial-gradient dot as the background of a pseudo-element, mask everything but the border
              area, and set <code>background-repeat: space</code> so the dots are spread evenly:
              <pre>{`.box::before {
  background: radial-gradient(circle, currentColor 1px, transparent 1.6px)
              0 0 / 6px 6px space;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
}`}</pre>
            </div>
          </div>
          <div className="ai-msg me">
            <Identicon value="you@example.com" cell={6} label="You" />
            <div className="ai-bubble">Nice. Can you also add a version that animates?</div>
          </div>
          <div className="ai-msg">
            <span className="ai-bot"><DotIcon name="star" step={2} /></span>
            <div style={{ display: "grid", gap: 10, minWidth: 260 }}>
              <Steps vertical current={1} aria-label="Assistant progress" items={[{ label: "Read dotkit docs", description: "3 pages" }, { label: "Write example" }, { label: "Check reduced motion" }]} />
              <Skeleton lines={2} />
              <Typing bubble label="Assistant is typing" />
            </div>
          </div>
        </div>

        <form className="ai-compose" onSubmit={(e) => e.preventDefault()}>
          <div className="ai-compose-row">
            <Input placeholder="Ask about dots…" aria-label="Message" />
            <Button type="submit" aria-label="Send"><DotIcon name="arrow-up" step={2} /></Button>
          </div>
          <div className="ai-opts">
            <Switch defaultChecked>Web search</Switch>
            <label className="dk-choice">
              Temperature
              <Range min={0} max={2} step={0.1} value={temp} onChange={(e) => setTemp(+e.target.value)} dotSize={3} gap={6} style={{ width: 140, minWidth: 0 }} />
              <span className="mono">{temp.toFixed(1)}</span>
            </label>
          </div>
        </form>
      </section>

      <Dialog ref={share} aria-labelledby="share-title">
        <h2 id="share-title" style={{ margin: "0 0 8px", fontSize: 20 }}>Share conversation</h2>
        <p className="muted" style={{ margin: "0 0 14px", fontSize: 14 }}>Anyone with the link can view this chat.</p>
        <Input readOnly value="https://chat.example.com/s/d0t5" aria-label="Share link" style={{ width: "100%" }} fieldClassName="dk-square" />
        <form method="dialog" className="dk-dialog__actions">
          <Button variant="outline" value="cancel">Close</Button>
          <Button value="copy">Copy link</Button>
        </form>
      </Dialog>
    </Card>
  );
}
