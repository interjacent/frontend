import { useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import "./Admin.css";
import { TimeChooseModal } from "../Modal/TimeChooseModal";

export const Admin = () => {
  const [lengthTime, setLengthTime] = useState("01:30");
  const [show, setShow] = useState(false);
  const users = ["Фырфырчик", "Пырпырчик", "Мявка", "Пырчик"];
  const intervals = [
    {
      dayOfWeek: "Вт",
      startTime: "14:00",
      endTime: "15:30",
    },
    {
      dayOfWeek: "Вт",
      startTime: "14:00",
      endTime: "15:30",
    },
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
            Я хочу организовать встречу на <input defaultValue={"01"} />:
            <input defaultValue={"30"} />
          </div>
          <Button>Организовать</Button>
          <div>
            <div>Удобное для всех время</div>
          </div>
        </div>
      </div>
      <TimeChooseModal show={show} intervals={intervals} />
    </div>
  );
};
