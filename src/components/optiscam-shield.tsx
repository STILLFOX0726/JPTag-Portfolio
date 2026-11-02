import { Shield, Sparkles } from "lucide-react";

// Animated hero artwork from the OptiScam app (optiscam-frontend.vercel.app).
export function OptiScamShield({ className }: { className?: string }) {
  return (
    <div className={`optiscam-hero ${className ?? ""}`} aria-hidden="true">
      <div className="os-grid" />
      <div className="os-core">
        <div className="os-core__halo" />
        <div className="os-core__ring os-core__ring--one" />
        <div className="os-core__ring os-core__ring--two" />
        <div className="os-core__shield">
          <Shield className="h-9 w-9" />
        </div>
        <span className="os-core__node os-core__node--one" />
        <span className="os-core__node os-core__node--two" />
      </div>
      <span className="os-badge">
        <Sparkles className="h-3 w-3" /> Multimodal scam detection
      </span>
      <div className="os-visual">
        <div className="os-visual__orbit os-visual__orbit--horizontal" />
        <div className="os-visual__orbit os-visual__orbit--vertical" />
        <div className="os-visual__glow" />
        <div className="os-visual__shield">
          <span className="os-visual__play" />
        </div>
        <span className="os-visual__particle os-visual__particle--cyan" />
        <span className="os-visual__particle os-visual__particle--pink" />
        <span className="os-visual__particle os-visual__particle--white" />
      </div>
    </div>
  );
}
