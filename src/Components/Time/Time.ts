export class Time {
  public hours: number;
  public minutes: number;

  constructor(hours: number, minutes: number) {
    this.hours = hours;
    this.minutes = minutes;
  }

  public getPrettyHours(): string {
    return this.hours.toString().padStart(2, '0')
  }

  public getPrettyMinutes(): string {
    return this.minutes.toString().padStart(2, '0')
  }

  public static fromString(timeStr: string): Time {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return new Time(hours, minutes);
  }

  public toUnixTimestamp(referenceDate: Date): number {
    referenceDate.setHours(this.hours, this.minutes, 0, 0);
    return Math.floor(referenceDate.getTime() / 1000);
  }
}