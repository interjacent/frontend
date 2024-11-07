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
import {Simulate} from "react-dom/test-utils";
import {Time} from "../Time/Time";

export const User = () => {
  const params = useParams();
  const pollId = params.publicPollId!;
  const [userId, setUserId] = useState(
    () => localStorage.getItem(pollId) ?? ""
  );
  const [username, setUsername] = useState("")

  const [daysOfWeek, setDaysOfWeek] = useState<DayOfWeek[]>([])
  const [intervals, setIntervals] = useState<TimeInterval[]>([]);
  const [fromTime, setFromTime] = useState<Time | null>(null)
  const [toTime, setToTime] = useState<Time | null>(null)
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek | null>()
  const [timeBorder, setTimeBorder] = useState<TimeInterval[]>([])

  const [active, setActive] = useState(true)
  const [closedPollInterval, setClosedPollInterval] = useState<TimeInterval>(TimeInterval.UNKNOWN)

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

    const localAvailableDaysOfWeek: DayOfWeek[] = []
    const localTimeBorder: TimeInterval[] = []
    response.data["days"].map((day: any) => {
      const dayInterval = new TimeInterval(day["start"], day["end"])
      const dayOfWeek = dayInterval.getStartDayOfWeek()

      localAvailableDaysOfWeek.push(dayOfWeek)
      localTimeBorder.push(dayInterval)
    })
    setDaysOfWeek(localAvailableDaysOfWeek.sort())
    setTimeBorder(localTimeBorder)

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
          { daysOfWeek.length > 0 && <Dropdown
            initialState={DayOfWeek.toString(daysOfWeek[0])}
            dropdownItems={daysOfWeek.map((day) => DayOfWeek.toString(day))}
            handleSelect={(item) => { setDayOfWeek(DayOfWeek.parse(item)) }  }
          />}{" "}
          с
          <input onChange={(e) => setFromTime(Time.fromString(e.target.value))} className="time-input" type="time" /> до{" "}
          <input onChange={(e) => setToTime(Time.fromString(e.target.value))} className="time-input" type="time" /> я
          <Button onClick={() => {
            if (fromTime !== null && fromTime.hours * 60 +  fromTime.minutes < timeBorder[0].getStartTime().hours * 60 + timeBorder[0].getStartTime().minutes) {
              alert("Нужно выбрать свободное время в рамках встречи")
              return;
            }
            if (toTime !== null && toTime.hours * 60 +  toTime.minutes > timeBorder[0].getEndTime().hours * 60 + timeBorder[0].getEndTime().minutes) {
              alert("Нужно выбрать свободное время в рамках встречи")
              return;
            }
            if (fromTime !== null && toTime !== null && fromTime.hours * 60 + fromTime.minutes > toTime.hours * 60 +  toTime.minutes) {
              alert("Время конца должно быть позже времени начала")
              return;
            }


            const availableInterval = TimeInterval.createFromString(
              fromTime === null ? timeBorder[0].getStartTime() : fromTime,
              toTime === null ? timeBorder[0].getEndTime() : toTime,
              dayOfWeek === null || dayOfWeek === undefined ? daysOfWeek[0] : dayOfWeek
            )
            const updateInterval = TimeInterval.addAvailableInterval(intervals, availableInterval)

            setIntervals(updateInterval)
            sendIntervals(updateInterval)
          }
          }>могу</Button>
          <Button onClick={() => {
            const unavailableInterval = TimeInterval.createFromString(
              fromTime === null ? timeBorder[0].getStartTime() : fromTime,
              toTime === null ? timeBorder[0].getEndTime() : toTime,
              dayOfWeek === null || dayOfWeek === undefined ? daysOfWeek[0] : dayOfWeek
            )
            const updatedIntervals = TimeInterval.subtractUnavailableInterval(intervals, unavailableInterval)

            setIntervals(updatedIntervals)
            sendIntervals(updatedIntervals)
          }}
          >не могу</Button>
        </div>
        <div className="text-line">
          <Button onClick={() => {
            setIntervals(timeBorder)
            sendIntervals(timeBorder)
          }}

          >могу всегда</Button>
          <Button onClick={() => {
            let updatedIntervals = [...intervals]
            timeBorder.forEach((timeBorder) => {
              updatedIntervals = TimeInterval.subtractUnavailableInterval(updatedIntervals, timeBorder)
            })

            setIntervals(updatedIntervals)
            sendIntervals(updatedIntervals)
          }}
          >не могу всегда</Button>
        </div>
      </div>

      <h4>Удобное для вас время:</h4>

      <Timetable intervals={intervals} timeBorder={timeBorder[0]}></Timetable>
    </div>
  );
};
