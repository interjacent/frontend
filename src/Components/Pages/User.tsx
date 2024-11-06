import { Final } from "./Final";
import { Login } from "./Login";
import { Button } from "../Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";
import "./User.css";

export const User = () => {
  const loggedIn = true;
  const closed = false;

  const daysOfWeek = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

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
          />{" "}
          с
          <input className="time-input" type="time" /> до{" "}
          <input className="time-input" type="time" /> я<Button>могу</Button>
          <Button>не могу</Button>
        </div>
        <div className="text-line">
          <Button>могу всегда</Button>
          <Button>не могу всегда</Button>
        </div>
      </div>

      <h4>Удобное для вас время:</h4>
    </div>
  );
};
