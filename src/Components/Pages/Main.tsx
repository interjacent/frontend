import { ChangeEvent, useState } from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import "./Main.css";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router";
import {
  addDays,
  endOfDay,
  getDay,
  getUnixTime,
  set,
  startOfDay,
} from "date-fns";
import { createAxios } from "../../createAxios";

export const Main = () => {
  const navigate = useNavigate();
  const [days, setDays] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("23:00");

  const setDaysI = (i: number) => (e: ChangeEvent<HTMLInputElement>) =>
    setDays((days) => days.map((c, ci) => (ci === i ? e.target.checked : c)));

  const handleSubmit = async () => {
    let currentDayOfWeek = getDay(new Date()) - 1;
    if (currentDayOfWeek < 0) currentDayOfWeek += 7;
    const daysFrom = days
      .slice(currentDayOfWeek)
      .concat(days.slice(0, currentDayOfWeek));
    const [startTimeHours, startTimeMinutes] = startTime.split(":").map(Number);
    const [endTimeHours, endTimeMinutes] = endTime.split(":").map(Number);
    const intervals = daysFrom.flatMap((day, i) => {
      if (!day) return [];
      return [
        {
          start: getUnixTime(
            set(startOfDay(addDays(new Date(), i)), {
              hours: startTimeHours,
              minutes: startTimeMinutes,
            })
          ),
          end: getUnixTime(
            set(endOfDay(addDays(new Date(), i)), {
              hours: endTimeHours,
              minutes: endTimeMinutes,
            })
          ),
        },
      ];
    });
    console.log(intervals);
    console.log(startTimeHours, endTime, days);

    const axios = createAxios();
    const response = await axios.post(`/polls`, {
      days: intervals,
    });
    const { publicId, privateId } = response.data;
    navigate(`/poll/${publicId}/${privateId}`);
  };

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
            defaultValue={"08:00"}
            onChange={(e) => setStartTime(e.target.value)}
            type="time"
          />{" "}
          до{" "}
          <input
            defaultValue={"23:00"}
            onChange={(e) => setEndTime(e.target.value)}
            type="time"
          />
        </div>
        <Button onClick={handleSubmit}>Создать ссылку-опрос</Button>
      </div>
    </div>
  );
};
