import {Final} from "./Final";
import {Login} from "./Login";
import './User.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Button} from "../Button/Button";
import {CustomDropdown} from "../Dropdown/Dropdown";
import React from "react";

export const User = () => {
  const loggedIn = true;
  const closed = false;

  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  if (!loggedIn) {
    return <Login />;
  }

  if (closed) {
    return <Final />;
  }

  return <div className="user-component">
    <h1 className="username">Фырфырчик #a1b24c</h1>

    <div className="choose-text">
      <div className="text-line">
        В <CustomDropdown initialState="Выберите день" dropdownItems={daysOfWeek}/> с
        <input className="time-input" type="time"/> до <input className="time-input" type="time"/> я
        <Button>могу</Button>
        <Button>не могу</Button>
      </div>
      <div className="text-line">
        <Button>могу всегда</Button>
        <Button>не могу всегда</Button>
      </div>
    </div>

    <h4>Удобное для вас время:</h4>
  </div>;
};
