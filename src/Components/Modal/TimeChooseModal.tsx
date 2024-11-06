import { PropsWithChildren } from "react";
import "./TimeChooseModal.css";
import { Button } from "../Button/Button";

export interface Interval {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

type Props = PropsWithChildren<{
  intervals: Interval[];
  show: boolean;
}>;

export const TimeChooseModal = (props: Props) => {
  return (
    <div className={"modal " + (props.show ? "" : "hidden")}>
      <div className="modal-header">Выберите удобное время:</div>
      <div className="modal-body">
        <div className="intervals-container">
          {props.intervals.map((interval, index) => (
            <div key={index} className="interval-box">
              {interval.dayOfWeek} {interval.startTime} - {interval.endTime}
              <Button>Выбрать</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
