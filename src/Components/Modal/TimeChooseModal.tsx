import { PropsWithChildren } from "react";
import "./TimeChooseModal.css";
import {Button} from "../Button/Button";
import {TimeInterval} from "../Time/TimeInterval";
import {DayOfWeek} from "../Time/DayOfWeek";

type Props = PropsWithChildren<{
  intervals: TimeInterval[],
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
              {DayOfWeek.toString(interval.getStartDayOfWeek())} {interval.getStartTime().getPrettyHHmm()} - {interval.getEndTime().getPrettyHHmm()}
              <Button>Выбрать</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
