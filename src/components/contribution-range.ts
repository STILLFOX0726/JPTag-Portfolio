export type Contribution = { date: string; count: number; level: number };
export type DateRange = { start: string; end: string };

export function recentRange(end: string, length: number): DateRange {
  const start = new Date(`${end}T00:00:00Z`);
  start.setUTCDate(start.getUTCDate() - length + 1);
  return { start: start.toISOString().slice(0, 10), end };
}

export function filterContributions(days: Contribution[], range: DateRange): Contribution[] {
  if (!range.start || !range.end || range.start > range.end) return [];
  return days
    .filter((day) => day.date >= range.start && day.date <= range.end)
    .sort((a, b) => a.date.localeCompare(b.date));
}
