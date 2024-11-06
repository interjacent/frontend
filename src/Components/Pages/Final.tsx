import './Final.css';
import {PropsWithChildren} from "react";

type Props = PropsWithChildren<{
  dayOfWeek: string;
  startTime: Date;
  endTime: Date;
}>;

export const Final = () => <div className="final-component">
  <h1 className="username">Фырфырчик #a1b24c</h1>

  <div className="final-message">
    <p>Встреча состоится <br/> во вт 14:00 - 15:30</p>
    <p className="final-good-luck">удачки</p>
  </div>
</div>;
