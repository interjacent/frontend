import { Final } from "./Final";
import { Login } from "./Login";
import { Button } from "../Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";
import "./User.css";
import {useState} from "react";
import {TimeInterval} from "../Time/TimeInterval";
import {DayOfWeek} from "../Time/DayOfWeek";
import { Timetable } from "../Time/Timetable";

export const User = () => {
  const loggedIn = true;
  const closed = false;

  const daysOfWeek = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

  const [intervals, setIntervals] = useState<TimeInterval[]>([]);
  const [fromTime, setFromTime] = useState("")
  const [toTime, setToTime] = useState("")
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>(DayOfWeek.MONDAY)


  if (!loggedIn) {
    return <Login />;
  }

  if (closed) {
    return <Final dayOfWeek="вт" startTime="14:00" endTime="15:30" />;
  }

  return (
    <div className="user-component text-center">
      <h1 className="username">Фырфырчик #a1b24c</h1>

      <div className="choose-text">
        <div className="text-line">
          В{" "}
          <Dropdown
            initialState="пн"
            dropdownItems={daysOfWeek}
            handleSelect={(item) => { setDayOfWeek(DayOfWeek.parse(item)) }  }
          />{" "}
          с
          <input onChange={(e) => setFromTime(e.target.value)} className="time-input" type="time" /> до{" "}
          <input onChange={(e) => setToTime(e.target.value)} className="time-input" type="time" /> я
          <Button onClick={() => {
            setIntervals([...intervals, TimeInterval.createFromString(fromTime, toTime, dayOfWeek)])
            console.log(TimeInterval.createFromString(fromTime, toTime, dayOfWeek))
            console.log(dayOfWeek.toString())
          }
          }>могу</Button>
          <Button>не могу</Button>
        </div>
        <div className="text-line">
          <Button>могу всегда</Button>
          <Button>не могу всегда</Button>
        </div>
      </div>

      <h4>Удобное для вас время:</h4>

      <Timetable intervals={intervals}></Timetable>
    </div>
  );
};
