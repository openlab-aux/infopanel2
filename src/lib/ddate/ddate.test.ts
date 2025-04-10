import { describe, it, expect } from "vitest";

import DDate from "./ddate";
import { DateTime } from "luxon";

describe("day of year", () => {
  it("1st of January is 1st day", () => {
    expect(new DDate(DateTime.local(2024, 1, 1)).dayOfYear).toBe(1);
    expect(new DDate(DateTime.local(2025, 1, 1)).dayOfYear).toBe(1);
    expect(new DDate(DateTime.local(2026, 1, 1)).dayOfYear).toBe(1);
  });

  it("2nd of January is 2nd day", () => {
    expect(new DDate(DateTime.local(2024, 1, 2)).dayOfYear).toBe(2);
  });

  it("1st of February is 32nd day", () => {
    expect(new DDate(DateTime.local(2024, 2, 1)).dayOfYear).toBe(32);
  });

  it("Feb 28 is day 59", () => {
    expect(new DDate(DateTime.local(2024, 2, 28)).dayOfYear).toBe(59);
  });

  it("Mar 1 is day 60", () => {
    expect(new DDate(DateTime.local(2024, 3, 1)).dayOfYear).toBe(60);
    expect(new DDate(DateTime.local(2025, 3, 1)).dayOfYear).toBe(60);
  });
});

describe("day of season", () => {
  it("Jan 1 is 1st day", () => {
    expect(new DDate(DateTime.local(2024, 1, 1)).dayOfSeason).toBe(1);
  });

  it("Mar 14 is 73", () => {
    expect(new DDate(DateTime.local(2024, 3, 14)).dayOfSeason).toBe(73);
  });

  it("Mar 15 is 1", () => {
    expect(new DDate(DateTime.local(2024, 3, 15)).dayOfSeason).toBe(1);
  });

  it("Oct 23 is 4", () => {
    expect(new DDate(DateTime.local(2024, 10, 23)).dayOfSeason).toBe(4);
  });
});

describe("day of week", () => {
  it("Jan 1 is sweetmorn", () => {
    expect(new DDate(DateTime.local(2024, 1, 1)).dayOfWeek).toBe("Sweetmorn");
  });

  it("Jan 6 is sweetmorn", () => {
    expect(new DDate(DateTime.local(2024, 1, 6)).dayOfWeek).toBe("Sweetmorn");
  });

  it("Mar 1 is setting orange", () => {
    expect(new DDate(DateTime.local(2024, 3, 1)).dayOfWeek).toBe(
      "Setting Orange",
    );
  });
});
