import { ChangeEvent, useState } from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import "./Main.css";
import { Button } from "../Button/Button";

export const Main = () => {
  const [days, setDays] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [fromPart1, setFromPart1] = useState("08");
  const [fromPart2, setFromPart2] = useState("00");

  const [toPart1, setToPart1] = useState("23");
  const [toPart2, setToPart2] = useState("00");

  const setDaysI = (i: number) => (e: ChangeEvent<HTMLInputElement>) =>
    setDays((days) => days.map((c, ci) => (ci === i ? e.target.checked : c)));

  const handleSubmit = () => {
    console.log(fromPart1, fromPart2, toPart1, toPart2, days);
  }

  return (
    <div className="container-center">
      <div className="main-page">
        <div className="logo">interjacent</div>
        <div>Мы готовы провести встречу в</div>
        <div className="checkboxes">
          <span>
            <Checkbox checked={days[0]} onChange={setDaysI(0)} /> Пн
          </span>
          <span>
            <Checkbox checked={days[1]} onChange={setDaysI(1)} /> Вт
          </span>
          <span>
            <Checkbox checked={days[2]} onChange={setDaysI(2)} /> Ср
          </span>
          <span>
            <Checkbox checked={days[3]} onChange={setDaysI(3)} /> Чт
          </span>
          <span>
            <Checkbox checked={days[4]} onChange={setDaysI(4)} /> Пт
          </span>
          <span>
            <Checkbox checked={days[5]} onChange={setDaysI(5)} /> Сб
          </span>
          <span>
            <Checkbox checked={days[6]} onChange={setDaysI(6)} /> Вс
          </span>
        </div>
        <div>
          с{" "}
          <input
            defaultValue={"08"}
            onChange={(e) => setFromPart1(e.target.value)}
          />
          :
          <input
            defaultValue={"00"}
            onChange={(e) => setFromPart2(e.target.value)}
          />{" "}
          до{" "}
          <input
            defaultValue={"23"}
            onChange={(e) => setToPart1(e.target.value)}
          />
          :
          <input
            defaultValue={"00"}
            onChange={(e) => setToPart2(e.target.value)}
          />
        </div>
        <Button onClick={handleSubmit}>Создать ссылку-опрос</Button>
      </div>
    </div>
  );
};
