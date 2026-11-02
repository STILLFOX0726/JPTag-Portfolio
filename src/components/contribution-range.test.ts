import { describe, expect, it } from "vitest";
import { filterContributions, recentRange } from "./contribution-range";

describe("contribution date ranges", () => {
  const days = [
    { date: "2025-01-03", count: 4, level: 2 },
    { date: "2025-01-01", count: 1, level: 1 },
    { date: "2025-01-02", count: 0, level: 0 },
    { date: "2024-12-31", count: 9, level: 3 },
  ];
  it("includes both selected boundaries and orders calendar dates", () => {
    expect(filterContributions(days, { start: "2025-01-01", end: "2025-01-03" })).toEqual([
      days[1],
      days[2],
      days[0],
    ]);
  });
  it("rejects reversed or incomplete custom ranges", () => {
    expect(filterContributions(days, { start: "2025-01-03", end: "2025-01-01" })).toEqual([]);
    expect(filterContributions(days, { start: "", end: "2025-01-03" })).toEqual([]);
  });
  it("uses an inclusive 30-day period across a leap-year boundary", () => {
    expect(recentRange("2024-03-01", 30)).toEqual({ start: "2024-02-01", end: "2024-03-01" });
  });
});
