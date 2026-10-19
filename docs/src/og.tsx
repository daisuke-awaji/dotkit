/* Open Graph card (1200×630). Rendered with dotkit itself; captured into public/og.png. */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Badge, Card, DotIcon, DotText, Dots, Halftone, RingMeter, Sparkline, StatusDot, UptimeBar, type UptimeState } from "dotkit/react";
import "./layers.css";
import "dotkit/css";
import "./og.css";

const spark = [12, 18, 15, 22, 19, 27, 24, 31, 28, 36, 33, 41, 38, 47, 44, 52];
const uptime: UptimeState[] = Array.from({ length: 36 }, (_, i) => (i === 11 ? "warn" : i === 26 ? "down" : "ok"));

function Og() {
  return (
    <div className="og">
      <Dots className="og-field" size={1.5} gap={14} fade="radial" />
      <Halftone
        className="og-sphere"
        gap={12}
        tone="radial-gradient(circle closest-side, transparent 99%, #8a8a8a 100%), radial-gradient(circle at 34% 30%, #000 0, #2a2a2a 30%, #6a6a6a 78%, #7e7e7e 100%)"
      />

      <div className="og-copy">
        <span className="og-eyebrow">
          <i /> Zero-runtime CSS · React bindings
        </span>
        <h1 className="og-title">
          <DotText gap={7} size={6}>dotkit</DotText>
        </h1>
        <p className="og-tag">UI made of dots<span className="og-period" /></p>
        <p className="og-sub">
          One CSS file. Two knobs. <span>Every pixel, a dot.</span>
        </p>
      </div>

      <Card className="og-card" color="var(--dk-subtle)">
        <div className="og-card-head">
          <StatusDot state="ok">All systems operational</StatusDot>
          <Badge>99.98%</Badge>
        </div>
        <UptimeBar data={uptime} rows={5} size={5} gap={10} label="Uptime" />
        <div className="og-card-row">
          <RingMeter value={0.72} count={24} diameter={88} size={5} label="Usage">
            <b>72</b>
          </RingMeter>
          <Sparkline data={spark} height={80} size={5} area label="Requests" />
        </div>
      </Card>

      <div className="og-foot">
        <DotIcon name="github" step={3} />
        <span>daisuke-awaji.github.io/dotkit</span>
      </div>
    </div>
  );
}

createRoot(document.getElementById("og")!).render(
  <StrictMode>
    <Og />
  </StrictMode>,
);
