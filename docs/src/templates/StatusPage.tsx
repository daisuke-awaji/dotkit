// Template: status page — built only from dotkit components + the CSS below.
import {
  Alert,
  Button,
  Card,
  DotDigits,
  DotIcon,
  DotLeaders,
  Input,
  Leader,
  RingMeter,
  Sparkline,
  StatusDot,
  Steps,
  UptimeBar,
  type UptimeState,
} from "dotkit/react";

const css = `
.sp { display: grid; gap: 20px; }
.sp-head { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
.sp-logo { display: flex; align-items: center; gap: 10px; font: 700 18px/1 var(--dk-font-mono); }
.sp-hero { display: flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap; }
.sp-hero h2 { margin: 6px 0 0; font-size: 24px; }
.sp-service { display: grid; gap: 10px; padding: 16px 0; }
.sp-service + .sp-service { border-top: 1px dotted var(--dk-mute); }
.sp-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; font-size: 14px; }
.sp-foot { display: flex; justify-content: space-between; font: 400 11px/1 var(--dk-font-mono); color: var(--dk-subtle); }
.sp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
@media (max-width: 720px) { .sp-grid { grid-template-columns: 1fr; } }
.sp-kpi { display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; margin-top: 10px; }
.sp-sub { display: flex; gap: 8px; flex-wrap: wrap; }
`;

// deterministic sample data
const days = (seed: number, incidents: Record<number, UptimeState>): UptimeState[] =>
  Array.from({ length: 90 }, (_, i) => incidents[i] ?? ((i * seed) % 97 === 0 ? "warn" : "ok"));
const services = [
  { name: "API", uptime: "99.98%", state: "ok" as const, data: days(7, { 62: "warn", 63: "down" }) },
  { name: "Dashboard", uptime: "99.95%", state: "ok" as const, data: days(11, { 40: "warn" }) },
  { name: "Webhooks", uptime: "99.71%", state: "warn" as const, data: days(13, { 12: "down", 13: "warn", 88: "warn", 89: "warn" }) },
  { name: "Edge network", uptime: "100%", state: "ok" as const, data: days(17, {}).map((s, i) => (i < 8 ? "none" : s)) },
];
const latency = Array.from({ length: 48 }, (_, i) => 120 + Math.sin(i / 4) * 18 + (i % 7) * 3 + (i > 40 ? 40 : 0));

export default function StatusPage() {
  return (
    <div className="sp">
      <style>{css}</style>

      <header className="sp-head">
        <span className="sp-logo"><DotIcon name="star" step={3} /> acme status</span>
        <div className="sp-sub">
          <Input type="email" placeholder="you@example.com" aria-label="Email for updates" leading={<DotIcon name="mail" step={2} />} />
          <Button>Subscribe</Button>
        </div>
      </header>

      <Card className="sp-hero">
        <div>
          <StatusDot state="warn" pulse>Partial degradation</StatusDot>
          <h2>Webhooks are delayed</h2>
        </div>
        <RingMeter value={0.9971} count={36} size={4} diameter={84} color="var(--dk-ok)" label="30-day SLA 99.71%">
          <b style={{ fontSize: 13 }}>99.7</b>
          <br />
          <span style={{ fontSize: 10 }} className="mono muted">SLA</span>
        </RingMeter>
      </Card>

      <Alert state="warn" title="Investigating — webhook deliveries delayed" icon={<DotIcon name="alert" step={2} />} role="status">
        Some webhook deliveries are delayed by up to 4 minutes. API and dashboard are not affected.
        <div style={{ marginTop: 14 }}>
          <Steps
            current={1}
            aria-label="Incident progress"
            items={[
              { label: "Investigating", description: "12:02" },
              { label: "Identified", description: "12:18" },
              { label: "Monitoring" },
              { label: "Resolved" },
            ]}
          />
        </div>
      </Alert>

      <Card>
        {services.map((s) => (
          <section key={s.name} className="sp-service" aria-label={s.name}>
            <div className="sp-row">
              <b>{s.name}</b>
              <span style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <span className="mono" style={{ color: "var(--dk-subtle)", fontSize: 12 }}>{s.uptime}</span>
                <StatusDot state={s.state}>{s.state === "ok" ? "Operational" : "Degraded"}</StatusDot>
              </span>
            </div>
            <UptimeBar data={s.data} label={`${s.name}: ${s.uptime} uptime over the last 90 days`} />
          </section>
        ))}
        <div className="sp-foot"><span>90 days ago</span><span>Today</span></div>
      </Card>

      <div className="sp-grid">
        <Card>
          <span className="eyebrow">API response time · 24h</span>
          <div className="sp-kpi">
            <DotDigits value="164" step={4} label="164 milliseconds" />
            <Sparkline data={latency} area color="var(--dk-info)" height={48} style={{ flex: 1, maxWidth: 220 }} label="Response time, last 24 hours" />
          </div>
        </Card>
        <Card>
          <span className="eyebrow">Past incidents</span>
          <DotLeaders style={{ marginTop: 12, fontSize: 14 }}>
            <Leader label="Webhook delays" value="Oct 17 · 46m" />
            <Leader label="Elevated API errors" value="Aug 20 · 12m" />
            <Leader label="Dashboard login issue" value="Jul 09 · 8m" />
          </DotLeaders>
        </Card>
      </div>
    </div>
  );
}
