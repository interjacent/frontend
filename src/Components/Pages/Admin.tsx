import { useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import "./Admin.css";
import { TimeInterval } from "../Time/TimeInterval";
import { TimeChooseModal } from "../Modal/TimeChooseModal";
import { Timetable } from "../Time/Timetable";

export const Admin = () => {
  const [lengthTime, setLengthTime] = useState("01:30");
  const [show, setShow] = useState(false);
  const users = ["Фырфырчик", "Пырпырчик", "Мявка", "Пырчик"];
  const intervals = [
    new TimeInterval(1730875515, 1730915915),
    new TimeInterval(1730805515, 1730825515),
  ];
  return (
    <div className="admin-page">
      <div className="header">Управление</div>
      <div className="panels">
        <div className="left">
          <div>Ссылка для голосования</div>
          <Input value="https://interjacent/aabbccdd" />
          <div>Участники</div>
          <div>
            <ul>
              {users.map((user) => (
                <li>{user}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="right">
          <div>
            Я хочу организовать встречу на{" "}
            <input
              defaultValue={lengthTime}
              type="time"
              onChange={(e) => setLengthTime(e.target.value)}
            />
          </div>
          <Button onClick={() => setShow(true)}>Организовать</Button>
          <div>
            <div>Удобное для всех время</div>
            <Timetable intervals={intervals} />
          </div>
        </div>
      </div>
      <TimeChooseModal show={show} intervals={intervals} />
    </div>
  );
};
