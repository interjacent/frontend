import { Final } from "./Final";
import { Login } from "./Login";
import { Button } from "../Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";
import "./User.css";
import { useState } from "react";
import { useParams } from "react-router";

export const User = () => {
  const params = useParams();
  const pollId = params.publicPollId!;
  const [userId, setUserId] = useState(
    () => localStorage.getItem(pollId) ?? ""
  );
  const closed = false;

  const daysOfWeek = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

  if (userId === "") {
    return <Login onLogin={setUserId} />;
  }

  if (closed) {
    return <Final dayOfWeek="вт" startTime="14:00" endTime="15:30" />;
  }

  return (
    <div className="user-component text-center">
      <h1 className="username">Фырфырчик #a1b24c</h1>

      <div className="choose-text">
        <div className="text-line">
          В <Dropdown initialState="пн" dropdownItems={daysOfWeek} /> с
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
