
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

  public static subtractUnavailableInterval(
    availableIntervals: TimeInterval[],
    unavailableInterval: TimeInterval
  ): TimeInterval[] {
    const result: TimeInterval[] = [];

    for (const interval of availableIntervals) {
      if (interval.endTime <= unavailableInterval.startTime || interval.startTime >= unavailableInterval.endTime) {
        result.push(interval);
      } else {
        if (interval.startTime < unavailableInterval.startTime) {
          result.push(new TimeInterval(interval.startTime, unavailableInterval.startTime));
        }

        if (interval.endTime > unavailableInterval.endTime) {
          result.push(new TimeInterval(unavailableInterval.endTime, interval.endTime));
        }
      }
    }

    return result;
  }

  public static addAvailableInterval(
    availableIntervals: TimeInterval[],
    newInterval: TimeInterval
  ): TimeInterval[] {
    const result: TimeInterval[] = [];
    let mergedInterval = newInterval;

    for (const interval of availableIntervals) {
      if (interval.endTime >= mergedInterval.startTime && interval.startTime <= mergedInterval.endTime) {
        mergedInterval = new TimeInterval(
          Math.min(mergedInterval.startTime, interval.startTime),
          Math.max(mergedInterval.endTime, interval.endTime)
        );
      } else {
        result.push(interval);
      }
    }

    result.push(mergedInterval);
    result.sort((a, b) => a.startTime - b.startTime);

    return result;
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
