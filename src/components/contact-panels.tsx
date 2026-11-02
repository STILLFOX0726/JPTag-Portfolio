import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight, Github, Mail, Send, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterContributions, recentRange, type Contribution } from "./contribution-range";

const email = "johnpaultaguinod30@gmail.com";
const githubUrl = "https://github.com/STILLFOX0726";
const levels = ["bg-muted", "bg-accent/35", "bg-accent/70", "bg-primary/70", "bg-primary"];

export function ContactPanels() {
  const [days, setDays] = useState<Contribution[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const [emailOpened, setEmailOpened] = useState(false);
  const [period, setPeriod] = useState("365");
  const [today, setToday] = useState("");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const now = new Date().toISOString().slice(0, 10);
    setToday(now);
    setCustomStart((value) => value || recentRange(now, 365).start);
    setCustomEnd((value) => value || now);
    setStatus("loading");
    fetch("https://github-contributions-api.jogruber.de/v4/STILLFOX0726?y=all", {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Contributions unavailable");
        const data = await response.json();
        if (!Array.isArray(data.contributions)) throw new Error("Invalid contribution data");
        setDays(data.contributions);
        setStatus("ready");
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus("error");
      });
    return () => controller.abort();
  }, [attempt]);

  function openEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const replyTo = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const body = `${message}\n\nFrom: ${name}\nReply to: ${replyTo}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Portfolio message from ${name}`)}&body=${encodeURIComponent(body)}`;
    setEmailOpened(true);
  }

  const availableDays = days
    .filter((day) => day.date <= today)
    .sort((a, b) => a.date.localeCompare(b.date));
  const years = [...new Set(availableDays.map((day) => day.date.slice(0, 4)))].sort().reverse();
  const range =
    period === "custom"
      ? { start: customStart, end: customEnd }
      : period.startsWith("year-")
        ? {
            start: `${period.slice(5)}-01-01`,
            end: `${period.slice(5)}-12-31` < today ? `${period.slice(5)}-12-31` : today,
          }
        : today
          ? recentRange(today, Number(period))
          : { start: "", end: "" };
  const invalidRange = !range.start || !range.end || range.start > range.end || range.end > today;
  const selectedDays = invalidRange ? [] : filterContributions(availableDays, range);
  const firstDay = selectedDays[0];
  const offset = firstDay ? new Date(`${firstDay.date}T00:00:00Z`).getUTCDay() : 0;
  const cells: (Contribution | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...selectedDays,
  ];
  const weeks = Array.from({ length: Math.ceil(cells.length / 7) }, (_, index) =>
    cells.slice(index * 7, index * 7 + 7),
  );
  const total = selectedDays.reduce((sum, day) => sum + day.count, 0);
  const activeDays = selectedDays.filter((day) => day.count > 0).length;
  const formatDate = (value: string) =>
    new Date(`${value}T00:00:00Z`).toLocaleDateString("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-2">
      <div className="reveal glass rounded-2xl p-6 md:p-8">
        <div className="mb-7 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary">
            <Mail className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-xl font-semibold">Send a message</h3>
            <a
              className="break-all text-xs text-muted-foreground hover:text-primary"
              href={`mailto:${email}`}
            >
              {email}
            </a>
          </div>
        </div>
        <form onSubmit={openEmail} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">
                Your name
              </label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                placeholder="Your name"
                className="h-11 w-full rounded-lg border bg-background/60 px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-sm font-medium">
                Your email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="h-11 w-full rounded-lg border bg-background/60 px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20"
              />
            </div>
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              maxLength={4000}
              rows={5}
              placeholder="What do you have in mind?"
              className="w-full resize-y rounded-lg border bg-background/60 p-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <Button type="submit" className="h-11 w-full gap-2">
            <Send />
            Send message
          </Button>
          {emailOpened && (
            <p role="status" className="text-sm text-muted-foreground">
              Your email draft is ready in your email app. Send it there to finish.
            </p>
          )}
        </form>
      </div>

      <div className="reveal glass flex min-w-0 flex-col rounded-2xl p-6 md:p-8">
        <div className="mb-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
              <Github className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-xl font-semibold">GitHub contributions</h3>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-primary"
              >
                @STILLFOX0726
              </a>
            </div>
          </div>
          <Button asChild variant="ghost" size="icon">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub profile"
              title="Open GitHub profile"
            >
              <ArrowUpRight />
            </a>
          </Button>
        </div>
        <div className="mb-6 space-y-3">
          <label id="contribution-period-label" className="block text-sm font-medium">
            Activity period
          </label>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger
              aria-labelledby="contribution-period-label"
              className="h-10 bg-background/60"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={`year-${year}`}>
                  {year}
                </SelectItem>
              ))}
              <SelectItem value="custom">Custom dates</SelectItem>
            </SelectContent>
          </Select>
          {period === "custom" && (
            <div className="grid min-w-0 grid-cols-2 gap-3">
              <div className="min-w-0">
                <label
                  htmlFor="contribution-start"
                  className="mb-1 block text-xs text-muted-foreground"
                >
                  From
                </label>
                <input
                  id="contribution-start"
                  type="date"
                  value={customStart}
                  max={customEnd || today}
                  onChange={(event) => setCustomStart(event.target.value)}
                  className="h-10 w-full min-w-0 rounded-md border bg-background/60 px-2 text-xs outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
              <div className="min-w-0">
                <label
                  htmlFor="contribution-end"
                  className="mb-1 block text-xs text-muted-foreground"
                >
                  To
                </label>
                <input
                  id="contribution-end"
                  type="date"
                  value={customEnd}
                  min={customStart}
                  max={today}
                  onChange={(event) => setCustomEnd(event.target.value)}
                  className="h-10 w-full min-w-0 rounded-md border bg-background/60 px-2 text-xs outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex min-h-56 flex-1 flex-col justify-center">
          {status === "loading" && (
            <div role="status" className="animate-pulse space-y-4">
              <div className="h-5 w-40 rounded bg-muted" />
              <div className="h-28 rounded bg-muted" />
              <p className="text-sm text-muted-foreground">Loading contributions…</p>
            </div>
          )}
          {status === "error" && (
            <div className="space-y-4">
              <p role="status" className="text-sm text-muted-foreground">
                Contributions are temporarily unavailable.
              </p>
              <Button variant="outline" onClick={() => setAttempt((value) => value + 1)}>
                <RefreshCw />
                Try again
              </Button>
            </div>
          )}
          {status === "ready" && invalidRange && (
            <p role="status" className="text-sm text-muted-foreground">
              Choose a valid start and end date, up to today.
            </p>
          )}
          {status === "ready" && !invalidRange && (
            <>
              <div className="mb-6" aria-live="polite">
                <span className="font-display text-4xl font-semibold text-primary">{total}</span>
                <p className="mt-2 text-sm text-muted-foreground">
                  contributions · {formatDate(range.start)} – {formatDate(range.end)}
                </p>
              </div>
              {selectedDays.length === 0 && (
                <p role="status" className="mb-4 text-sm text-muted-foreground">
                  No public activity data for this period.
                </p>
              )}
              <div
                className="overflow-x-auto pb-3"
                aria-label="GitHub contribution calendar"
                tabIndex={0}
              >
                <div className="flex w-max gap-[3px]">
                  {weeks.map((week, index) => (
                    <div key={index} className="flex w-2 flex-col gap-[3px]">
                      <span className="mb-2 h-4 whitespace-nowrap text-[10px] text-muted-foreground">
                        {index % 5 === 0 && week.find((day) => day)
                          ? new Date(
                              `${week.find((day) => day)?.date}T00:00:00Z`,
                            ).toLocaleDateString("en", { month: "short", timeZone: "UTC" })
                          : ""}
                      </span>
                      {week.map((day, dayIndex) =>
                        day ? (
                          <div
                            key={day.date}
                            role="img"
                            aria-label={`${day.count} contributions on ${day.date}`}
                            title={`${day.count} contributions on ${day.date}`}
                            className={`h-2 w-2 rounded-[2px] transition hover:ring-1 hover:ring-ring ${levels[day.level] ?? levels[0]}`}
                          />
                        ) : (
                          <div key={dayIndex} className="h-2 w-2" />
                        ),
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                <span>{activeDays} active days</span>
                <div className="flex items-center gap-1.5">
                  <span className="mr-1">Less</span>
                  {levels.map((level) => (
                    <span key={level} className={`h-2 w-2 rounded-[2px] ${level}`} />
                  ))}
                  <span className="ml-1">More</span>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="mt-8 border-t pt-5">
          <Button asChild variant="link" className="h-auto p-0">
            <a href={`${githubUrl}?tab=repositories`} target="_blank" rel="noopener noreferrer">
              Explore my repositories
              <ArrowUpRight />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
