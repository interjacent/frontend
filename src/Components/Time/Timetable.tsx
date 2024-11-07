import { PropsWithChildren } from "react";
import "./Timetable.css";
import { DayOfWeek } from "./DayOfWeek";
import { TimeInterval } from "./TimeInterval";

type Props = PropsWithChildren<{
  intervals: TimeInterval[];
  timeBorder: TimeInterval
}>;

const daysOfWeekIndexed = [
  DayOfWeek.SUNDAY,
  DayOfWeek.MONDAY,
  DayOfWeek.TUESDAY,
  DayOfWeek.WEDNESDAY,
  DayOfWeek.THURSDAY,
  DayOfWeek.FRIDAY,
  DayOfWeek.SATURDAY,
];

export const Timetable = (props: Props) => {
  const groupedIntervals = groupIntervalsByDayOfWeek(props.intervals);

  function groupIntervalsByDayOfWeek(intervals: TimeInterval[]): {
    [key in DayOfWeek]?: TimeInterval[];
  } {
    const groupedIntervals: { [key in DayOfWeek]?: TimeInterval[] } = {};

    intervals.forEach((interval) => {
      const dayOfWeek = interval.getStartDayOfWeek() as DayOfWeek;

      if (!groupedIntervals[dayOfWeek]) {
        groupedIntervals[dayOfWeek] = [];
      }

      groupedIntervals[dayOfWeek]?.push(interval);
    });

    return groupedIntervals;
  }

  function calculatePositionAndHeight(startTime: number, endTime: number) {
    const secondsInDay = 86400;
    const secondsInPeriod =  (props.timeBorder.endTime - props.timeBorder.startTime);

    const duration = ((endTime - startTime) / secondsInPeriod) * 100;
    const startOffset = ((startTime - ((Math.floor((startTime - props.timeBorder.startTime) / secondsInDay)) * secondsInDay) - props.timeBorder.startTime) / secondsInPeriod) * 100;

    return { top: `${startOffset}%`, height: `${duration}%` };
  }

  return (
    <div className="timetable">
      { Object.keys(groupedIntervals).length !== 0 && props.timeBorder !== undefined && <div className="time-border-timetable">
        <div style={{ marginTop: "50px" }}>{props.timeBorder.getStartTime().getPrettyHHmm()}</div>
        <div>{props.timeBorder.getEndTime().getPrettyHHmm()}</div>
      </div> }
      { props.timeBorder !== undefined && <div className="day-of-week-container">
        {daysOfWeekIndexed.map((day, index) => {
          if (groupedIntervals[day]?.length !== undefined) {
            const intervals = groupedIntervals[day];

            return (
              <div key={day}>
                <p>{DayOfWeek.toString(daysOfWeekIndexed[index])}</p>
                <div className="day-of-week-box">
                  {intervals?.map((interval) => {
                    const { top, height } = calculatePositionAndHeight(
                      interval.startTime,
                      interval.endTime
                    );
                    return (
                      <div
                        key={interval.startTime}
                        className="interval"
                        style={{ top: top, height: height }}
                      >
                        {interval.getStartTime().getPrettyHHmm()}-
                        {interval.getEndTime().getPrettyHHmm()}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div> }
    </div>
  );
};
