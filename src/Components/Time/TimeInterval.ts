
import {Time} from "./Time";
import {DayOfWeek} from "./DayOfWeek";

const daysOfWeekIndexed = [
  DayOfWeek.SUNDAY,
  DayOfWeek.MONDAY,
  DayOfWeek.TUESDAY,
  DayOfWeek.WEDNESDAY,
  DayOfWeek.THURSDAY,
  DayOfWeek.FRIDAY,
  DayOfWeek.SATURDAY
];

export class TimeInterval {
  public startTime: number;
  public endTime: number;

  constructor(startTime: number, endTime: number) {
    this.startTime = startTime;
    this.endTime = endTime;
  }

  // strings in format HH:mm
  public static createFromString(startTimeStr: string, endTimeStr: string, dayOfWeek: DayOfWeek): TimeInterval {
    const today = new Date();
    const currentDayOfWeek = today.getDay();

    const daysUntilTarget = (dayOfWeek - currentDayOfWeek + 7) % 7;
    today.setDate(today.getDate() + daysUntilTarget);

    const startTime = Time.fromString(startTimeStr);
    const endTime = Time.fromString(endTimeStr);

    const startTimestamp = startTime.toUnixTimestamp(new Date(today));
    const endTimestamp = endTime.toUnixTimestamp(new Date(today));

    return new TimeInterval(startTimestamp, endTimestamp);
  }

  public getStartDayOfWeek(): DayOfWeek {
    return this.getDayOfWeek(this.startTime);
  }

  public getStartTime(): Time {
    return this.convertUnixToReadable(this.startTime);
  }

  public getEndTime(): Time {
    return this.convertUnixToReadable(this.endTime);
  }

  private getDayOfWeek(timestamp: number): DayOfWeek {
    const date = new Date(timestamp * 1000);
    return daysOfWeekIndexed[date.getDay()];
  }

  private convertUnixToReadable(timestamp: number): Time {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return new Time(hours, minutes);
  }
}
