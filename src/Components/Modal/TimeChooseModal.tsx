import {PropsWithChildren} from "react";
import {Modal} from "react-bootstrap";
import "./TimeChooseModal.css";
import {Button} from "../Button/Button";

export interface Interval {
  startTime: string,
  endTime: string
}

type Props = PropsWithChildren<{
  intervals: Interval[],
  show: boolean;
}>;

export const TimeChooseModal = (props: Props) => {

  return (
    <Modal show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title>Выберите удобное время:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="intervals-container">
          {props.intervals.map((interval, index) => (
            <div key={index} className="interval-box">
              {interval.startTime} - {interval.endTime}
              <Button>Выбрать</Button>
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  )
}