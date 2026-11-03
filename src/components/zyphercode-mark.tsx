import { Sparkles } from "lucide-react";

// Animated card artwork for ZypherCode (zyphercode.vercel.app), built around its wave logo.
const lines = [
  { k: "numfr", rest: " rizz hits 100 periodt" },
  { k: "lowkey", rest: " rizz glowing 50 era" },
  { k: "spill", rest: ' "slay" periodt' },
  { k: "done", rest: "" },
];

export function ZypherCodeMark({ className }: { className?: string }) {
  return (
    <div className={`zyphercode-hero ${className ?? ""}`} aria-hidden="true">
      <div className="zc-grid" />
      <span className="zc-badge">
        <Sparkles className="h-3 w-3" /> Gen Z Code Studio
      </span>
      <div className="zc-stage">
        <div className="zc-glow" />
        <div className="zc-mark">
          <svg className="zc-waves" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="zcWaveFade" x1="0" x2="1">
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset=".1" stopColor="#fff" />
                <stop offset=".9" stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <mask id="zcWaveMask" maskUnits="userSpaceOnUse" x="2" y="0" width="20" height="24">
                <rect x="2" y="0" width="20" height="24" fill="url(#zcWaveFade)" />
              </mask>
              <path
                id="zcWaveLine"
                d="M-3 0c2 1.5 4 1.5 6 0c2-1.5 4-1.5 6 0c2 1.5 4 1.5 6 0c2-1.5 4-1.5 6 0c2 1.5 4 1.5 6 0c2-1.5 4-1.5 6 0c2 1.5 4 1.5 6 0c2-1.5 4-1.5 6 0"
              />
            </defs>
            <g mask="url(#zcWaveMask)">
              <use href="#zcWaveLine" className="zc-wave zc-wave--1" y="7" />
              <use href="#zcWaveLine" className="zc-wave zc-wave--2" y="12" />
              <use href="#zcWaveLine" className="zc-wave zc-wave--3" y="17" />
            </g>
          </svg>
        </div>
        <span className="zc-token zc-token--one">periodt</span>
        <span className="zc-token zc-token--two">spill</span>
        <span className="zc-token zc-token--three">slay</span>
      </div>
      <div className="zc-editor">
        <div className="zc-editor__bar">
          <span />
          <span />
          <span />
          <em>main.slay</em>
        </div>
        {lines.map((l, i) => (
          <div key={i} className="zc-line" style={{ animationDelay: `${i * 0.9}s` }}>
            <b>{l.k}</b>
            {l.rest}
          </div>
        ))}
        <i className="zc-cursor" />
      </div>
    </div>
  );
}
