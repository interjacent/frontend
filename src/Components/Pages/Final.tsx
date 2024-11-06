import "./Final.css";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}>;

export const Final = (props: Props) => (
  <div className="final-component">
    <h1 className="username">Фырфырчик #a1b24c</h1>

    <div className="final-message">
      <div>Встреча состоится</div>
      <div>
        во {props.dayOfWeek} {props.startTime} - {props.endTime}
      </div>
      <p className="text-active">удачки</p>
    </div>
  </div>
);
