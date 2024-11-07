import { Final } from "./Final";
import { Login } from "./Login";
import { Button } from "../Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";
import "./User.css";
import {useEffect, useState} from "react";
import { useParams } from "react-router";
import {TimeInterval} from "../Time/TimeInterval";
import {DayOfWeek} from "../Time/DayOfWeek";
import { Timetable } from "../Time/Timetable";
import {createAxios} from "../../createAxios";

export const User = () => {
  const params = useParams();
  const pollId = params.publicPollId!;
  const [userId, setUserId] = useState(
    () => localStorage.getItem(pollId) ?? ""
  );
  const [username, setUsername] = useState("")

  const daysOfWeek = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
  const [intervals, setIntervals] = useState<TimeInterval[]>([]);
  const [fromTime, setFromTime] = useState("")
  const [toTime, setToTime] = useState("")
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>(DayOfWeek.MONDAY)

  const [active, setActive] = useState(true)
  const [closedPollInterval, setClosedPollInterval] = useState<TimeInterval>(new TimeInterval(0, 0))

  useEffect(() => {
    if (userId !== "") {
      getIntervals();
      getPollInfo();
    }
  }, [userId]);

  const getIntervals = async () => {
    const axios = createAxios();
    const response = await axios.get(`polls/${pollId}/users/${userId}/intervals`)
    const parsedIntervals = response.data["intervals"].map((interval: { start: number; end: number; }) => {
      return new TimeInterval(interval.start, interval.end);
    })

    setUsername(response.data["userName"])
    setIntervals(parsedIntervals)
  }

  const getPollInfo = async () => {
    const axios = createAxios();
    const response = await axios.get(`polls/${pollId}`)

    console.log(response.data)
    if (response.data["active"] == false) {
      setActive(false)
      setClosedPollInterval(new TimeInterval(response.data["result"]["start"], response.data["result"]["end"]))
    }
  }

  const sendIntervals = async (newIntervals: TimeInterval[]) => {
    const axios = createAxios();

    const intervalsForRequest = newIntervals.map((interval) => {
      return {
        start: interval.startTime,
        end: interval.endTime,
        busy: true
      }
    })

    await axios.post(`polls/${pollId}/users/${userId}/intervals`, intervalsForRequest);
  }

  if (userId === "") {
    return <Login onLogin={ (userId, username) => {
      setUserId(userId);
      setUsername(username)
    }
    } />;
  }

  if (!active) {
    return <Final dayOfWeek="вт" startTime={closedPollInterval?.getStartTime().getPrettyHHmm()} endTime={closedPollInterval?.getEndTime().getPrettyHHmm()} />;
  }

  return (
    <div className="user-component text-center">
      <h1 className="username">{username}</h1>

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
            const newIntervals = [...intervals, TimeInterval.createFromString(fromTime, toTime, dayOfWeek)]
            setIntervals(newIntervals)
            sendIntervals(newIntervals)
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
