import { DateTime } from "luxon";
import getOrdinal from "./ordinals";

export default class DDate {
  readonly seasons: string[] = [
    "Chaos",
    "Discord",
    "Confusion",
    "Bureaucracy",
    "The Aftermath",
  ];

  readonly daysOfWeek: string[] = [
    "Sweetmorn",
    "Boomtime",
    "Pungenday",
    "Prickle-Prickle",
    "Setting Orange",
  ];

  readonly seasonHolidays: string[] = [
    "Chaoflux",
    "Discoflux",
    "Confuflux",
    "Bureflux",
    "Afflux",
  ];

  readonly apostleHolidays: string[] = [
    "Mungday",
    "Mojoday",
    "Syaday",
    "Zaraday",
    "Maladay",
  ];

  date: DateTime;

  constructor(date: DateTime) {
    this.date = date;
  }

  get dayOfYear(): number {
    if (this.date.isInLeapYear) {
      const threshold = DateTime.local(this.date.year, 2, 28);
      console.log(threshold.toString());

      if (this.date > threshold) {
        return this.date.ordinal - 1;
      }
    }
    return this.date.ordinal;
  }

  get year(): number {
    return this.date.year + 1166;
  }

  get seasonNumber(): number {
    return Math.floor(this.dayOfYear / 73);
  }

  get season(): string {
    return this.seasons[this.seasonNumber];
  }

  get dayOfSeason(): number {
    return ((this.dayOfYear - 1) % 73) + 1;
  }

  get dayOfWeek(): string {
    return this.daysOfWeek[(this.dayOfYear - 1) % 5];
  }

  get holiday(): string | null {
    const dos = this.dayOfSeason;
    const season = this.seasonNumber;

    // Apostle Holidays
    if (dos == 5) {
      return this.apostleHolidays[season];
    }

    // Season Holidays
    if (dos == 50) {
      return this.seasonHolidays[season];
    }

    return null;
  }

  get stTibbsDay(): boolean {
    return this.date.month == 2 && this.date.day == 28;
  }

  toString(): string {
    if (this.stTibbsDay) {
      return "Today is St. Tibb's Day";
    } else {
      const dateStr = `Today is ${this.dayOfWeek}, the ${getOrdinal(this.dayOfSeason)} day of ${this.season} in the YOLD ${this.year}.`;
      const holiday = this.holiday;
      if (holiday) {
        return `${dateStr} Celebrate ${holiday}!`;
      }
      return dateStr;
    }
  }
}
