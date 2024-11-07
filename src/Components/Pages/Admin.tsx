import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import "./Admin.css";
import { TimeInterval } from "../Time/TimeInterval";
import { TimeChooseModal } from "../Modal/TimeChooseModal";
import { Timetable } from "../Time/Timetable";
import { createAxios } from "../../createAxios";
import { useParams } from "react-router";

export const Admin = () => {
  const params = useParams();
  const { publicPollId, privatePollId } = params;
  const [lengthTime, setLengthTime] = useState("01:30");
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState<string[]>([]);
  const [intervals, setIntervals] = useState<TimeInterval[]>([]);
  const [availables, setAvailables] = useState<TimeInterval[]>([]);

  useEffect(() => {
    const axios = createAxios();
    const fetchData = async () => {
      const response = await axios.get(`/polls/${publicPollId}`);
      const data = response.data;
      setUsers(data.users.map((user: any) => user.userName));
      setIntervals(
        data.availables.map((int: any) => new TimeInterval(int.start, int.end))
      );
    };

    fetchData();
  }, [publicPollId, privatePollId]);

  const handleSelect = () => {
    const [hours, minutes] = lengthTime.split(":").map(Number);
    const lengthSeconds = (hours * 60 + minutes) * 60;
    const availables = intervals
      .filter((int) => int.endTime - int.startTime >= lengthSeconds)
      .map(
        (int) => new TimeInterval(int.startTime, int.startTime + lengthSeconds)
      );
    setAvailables(availables);
    setShow(true);
  };

  const handleFinish = async (int: TimeInterval) => {
    const axios = createAxios();
    await axios.post(`/polls/${privatePollId}/finish`, {
      adminToken: privatePollId,
      start: int.startTime,
      end: int.endTime,
    });
  };

  return (
    <div className="admin-page">
      <div className="header">Управление</div>
      <div className="panels">
        <div className="left">
          <div>Ссылка для голосования</div>
          <Input
            value={new URL(
              `/polls/${publicPollId}`,
              window.location.toString()
            ).toString()}
            readOnly
          />
          <div>Участники</div>
          <div>
            <ul>
              {users.map((user) => (
                <li key={user}>{user}</li>
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
          <Button onClick={handleSelect}>Организовать</Button>
          <div>
            <div>Удобное для всех время</div>
            <Timetable intervals={intervals} />
          </div>
        </div>
      </div>
      <TimeChooseModal
        show={show}
        intervals={availables}
        onFinish={handleFinish}
      />
    </div>
  );
};
