import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { CityGrass } from "@/components/city-grass";
import { ContactPanels } from "@/components/contact-panels";
import { OptiScamShield } from "@/components/optiscam-shield";
import {
  ArrowUpRight,
  ArrowRight,
  ShieldAlert,
  BrainCircuit,
  Truck,
  Waypoints,
  Target,
  Sprout,
  Database,
  Code2,
  ShieldCheck,
  Award,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JP Taguinod — Data Analyst & AI Specialist" },
      {
        name: "description",
        content: "John Paul Taguinod simplifies data and builds smarter, data-driven solutions.",
      },
      { property: "og:title", content: "JP Taguinod — Data Analyst & AI Specialist" },
      {
        property: "og:description",
        content: "Selected data, AI and software work by John Paul Taguinod.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Monogram({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-label="P monogram">
      <rect width="40" height="40" rx="12" className="fill-primary" />
      <path
        d="M13.5 9.25v21.75"
        className="stroke-primary-foreground"
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M13.5 9h11L30 13v5.5l-5.5 4h-11"
        className="stroke-primary-foreground"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="15.75" r="2.2" className="fill-accent animate-pulse" />
    </svg>
  );
}

const approach = [
  {
    icon: Waypoints,
    t: "Connect the dots",
    d: "Turning scattered data into a clear story people can act on.",
  },
  {
    icon: Target,
    t: "Build with purpose",
    d: "Every model, query and dashboard starts with a real question.",
  },
  {
    icon: Sprout,
    t: "Keep learning",
    d: "Curious by default — new tools, new methods, better answers.",
  },
];

const work = [
  {
    icon: ShieldAlert,
    t: "OptiScam",
    art: OptiScamShield,
    d: "OptiScam is a multimodal AI model built on Qwen3-VL that analyzes the visuals, audio, and on-screen text of short-form videos to identify and flag potential scams on platforms such as YouTube and TikTok before viewers are misled or harmed.",
    tags: ["Qwen3-VL", "Multimodal AI", "Scam Detection"],
    href: "https://optiscam-research.vercel.app",
  },
  {
    icon: BrainCircuit,
    cat: "Machine Learning",
    t: "Predictive Churn Model",
    d: "Flags at-risk customers early so teams can act before they leave.",
    tags: ["Python", "ML", "Prediction"],
    href: "https://zyphercode.vercel.app/",
  },
  {
    icon: Truck,
    cat: "Optimization",
    t: "Supply Chain Optimizer",
    d: "Finds bottlenecks and suggests smarter routes and stock levels.",
    tags: ["PL/SQL", "Python", "Automation"],
    href: "https://optiscam-research.vercel.app",
  },
];

const toolkit = [
  {
    icon: Database,
    t: "Data & Analytics",
    s: ["MySQL", "PL/SQL", "Data storytelling", "Dashboard design"],
  },
  {
    icon: BrainCircuit,
    t: "Machine Learning",
    s: ["Python", "AI workflows", "Pattern discovery", "Predictive thinking"],
  },
  {
    icon: Code2,
    t: "Software Engineering",
    s: ["JavaScript", "React", "C++", "Java", "PHP", "HTML", "CSS"],
  },
  {
    icon: ShieldCheck,
    t: "Automation & Quality",
    s: ["Selenium", "Playwright", "Testing", "Reliable systems"],
  },
];

function Index() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 animate-fade-up">
        <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3">
          <a href="#" className="flex items-center gap-3">
            <Monogram />
            <span className="hidden font-display text-sm font-semibold sm:inline">
              John Paul Taguinod
            </span>
          </a>
          <div className="flex items-center gap-4 text-sm md:gap-6">
            <a href="#work" className="link-underline text-muted-foreground hover:text-foreground">
              Work
            </a>
            <a href="#about" className="link-underline text-muted-foreground hover:text-foreground">
              About
            </a>
            <a
              href="#toolkit"
              className="link-underline hidden text-muted-foreground hover:text-foreground sm:inline"
            >
              Toolkit
            </a>
            <a
              href="#contact"
              className="rounded-full bg-primary px-4 py-2 text-primary-foreground transition hover:scale-105"
            >
              Let's Talk
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="bg-hero-gradient relative px-4 pb-24 pt-36 md:px-8 md:pt-44">
        <CityGrass className="absolute inset-y-0 right-0 w-full opacity-40 animate-fade-up [animation-delay:600ms] md:w-[62%] md:opacity-100" />
        <div className="relative mx-auto max-w-6xl">
          <div>
            <p className="mb-6 inline-flex flex-wrap items-center gap-x-4 gap-y-1 rounded-full border bg-card/70 px-5 py-2.5 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur animate-fade-up md:text-base">
              {["Aspiring Software Engineer", "Machine Learning", "Specialist"].map((r, i) => (
                <span key={r} className="inline-flex items-center gap-4">
                  {i > 0 && <span aria-hidden="true" className="h-4 w-px bg-border" />}
                  <span className={i === 0 ? "font-semibold text-foreground" : undefined}>{r}</span>
                </span>
              ))}
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              {(() => {
                const word = (w: string, i: number, last = false) => (
                  <span
                    key={i}
                    className={`${last ? "" : "mr-[0.25em] "}inline-block animate-fade-up`}
                    style={{ animationDelay: `${100 + i * 60}ms` }}
                  >
                    {w === "JP." ? (
                      <>
                        <span className="text-primary">JP</span>.
                      </>
                    ) : (
                      w
                    )}
                  </span>
                );
                const words =
                  "Hi, I'm JP. Building Intelligent AI Solutions for a Smarter future.".split(" ");
                const boxed = ["Building", "Intelligent", "AI"];
                const start = words.indexOf(boxed[0]!);
                return [
                  ...words.slice(0, start).map((w, i) => word(w, i)),
                  <span
                    key="boxed"
                    className="mr-[0.25em] rounded-2xl border border-[oklch(0.56_0.14_142)]/30 bg-[oklch(0.56_0.14_142)]/12 px-[0.2em] text-[oklch(0.5_0.14_142)] box-decoration-clone animate-fade-up [animation-delay:250ms]"
                  >
                    {boxed.map((w, j) => word(w, start + j, j === boxed.length - 1))}
                  </span>,
                  ...words
                    .slice(start + boxed.length)
                    .map((w, i) => word(w, start + boxed.length + i)),
                ];
              })()}
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground animate-fade-up [animation-delay:800ms]">
              A Computer Science graduate turning complex data into clear insight — through
              analytics, machine learning and well-built software.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5 animate-fade-up [animation-delay:950ms]">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:scale-105"
              >
                Explore my work{" "}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a href="#about" className="link-underline font-medium text-foreground">
                A little about me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="px-4 py-20 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {approach.map((a, i) => (
            <div
              key={a.t}
              className="reveal glass rounded-2xl p-6 transition hover:-translate-y-1"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <a.icon className="mb-4 h-6 w-6 text-primary" />
              <h3 className="mb-2 text-lg font-semibold">{a.t}</h3>
              <p className="text-sm text-muted-foreground">{a.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Work */}
      <section id="work" className="scroll-mt-24 px-4 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="reveal mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Featured work
          </p>
          <h2 className="reveal mb-12 text-3xl font-semibold md:text-5xl">Selected projects</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {work.map((w, i) => (
              <article
                key={w.t}
                className="reveal glass group flex flex-col rounded-3xl p-6 transition duration-500 hover:-translate-y-2"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {w.art && <w.art className="-mx-6 -mt-6 mb-6 h-72 rounded-t-3xl" />}
                <div className="mb-6 flex items-center justify-between">
                  {!w.art && (
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground transition group-hover:rotate-6">
                      <w.icon className="h-6 w-6" />
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">{w.cat}</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold">{w.t}</h3>
                <p className="mb-5 flex-1 text-sm text-muted-foreground">{w.d}</p>
                <div className="mb-6 flex flex-wrap gap-2">
                  {w.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary"
                >
                  View concept <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 px-4 py-20 md:px-8">
        <div className="reveal glass mx-auto grid max-w-6xl items-center gap-10 rounded-3xl p-8 md:grid-cols-[auto_1fr] md:p-12">
          <div className="relative mx-auto grid h-40 w-40 place-items-center">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40 animate-spin-slow" />
            <Monogram className="h-24 w-24" />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">About</p>
            <h2 className="mb-4 text-3xl font-semibold">
              Between data, technology and human curiosity.
            </h2>
            <p className="text-muted-foreground">
              I'm a Computer Science graduate specializing in Software Engineering. I love the space
              where numbers meet people — asking better questions, finding patterns others miss, and
              building tools that make decisions easier.
            </p>
          </div>
        </div>
      </section>

      {/* Toolkit */}
      <section id="toolkit" className="scroll-mt-24 px-4 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="reveal mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Toolkit
          </p>
          <h2 className="reveal mb-12 text-3xl font-semibold md:text-5xl">What I work with</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {toolkit.map((k, i) => (
              <div
                key={k.t}
                className="reveal glass rounded-2xl p-6 transition hover:-translate-y-1"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <k.icon className="mb-4 h-6 w-6 text-primary" />
                <h3 className="mb-4 font-semibold">{k.t}</h3>
                <ul className="flex flex-wrap gap-2">
                  {k.s.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border px-3 py-1 text-xs transition hover:bg-primary hover:text-primary-foreground"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification */}
      <section className="px-4 py-12 md:px-8">
        <div className="reveal mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-3xl border-2 border-dashed border-primary/30 p-8 text-center md:flex-row md:text-left">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-secondary animate-float">
            <Award className="h-7 w-7 text-primary" />
          </span>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Professional certification — coming soon</h3>
            <p className="text-sm text-muted-foreground">
              Currently working toward a new credential in data and AI. This spot is saved for it.
            </p>
          </div>
          <span className="rounded-full bg-secondary px-4 py-2 text-xs font-medium text-secondary-foreground">
            In progress
          </span>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24 px-4 py-28 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="reveal mb-10 text-center">
            <h2 className="mb-4 text-3xl font-semibold md:text-5xl">
              Let's make the complex clear.
            </h2>
            <p className="mx-auto max-w-md text-muted-foreground">
              Have data that needs a story, or an idea that needs building? I'd love to hear about
              it.
            </p>
          </div>
          <ContactPanels />
        </div>
      </section>

      <footer className="border-t px-4 py-8 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <span>© 2026 John Paul Taguinod</span>
          <div className="flex gap-5">
            <a
              href="https://github.com/STILLFOX0726"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-primary"
            >
              <Github className="h-5 w-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:johnpaultaguinod30@gmail.com"
              aria-label="Email"
              className="hover:text-primary"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
