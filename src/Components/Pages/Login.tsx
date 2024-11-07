import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { v4 as uuidv4 } from "uuid";
import "./Login.css";
import { useParams } from "react-router";
import { createAxios } from "../../createAxios";

type Props = {
  onLogin: (userId: string, username: string) => unknown
}

export const Login = (props: Props) => {
  const params = useParams();
  const [name, setName] = useState<string>("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (name.length < 4) {
      return;
    }
    const uuid = uuidv4();
    const pollId = params.publicPollId!;
    console.log(name, uuid, pollId);
    const axios = createAxios();
    await axios.post(`/polls/${pollId}/join`, {
      userId: uuid,
      userName: name,
    });
    localStorage.setItem(pollId, uuid);
    props.onLogin(uuid, name);
  };

  return (
    <form className="login-container" onSubmit={handleSubmit}>
      <label className="container-label" htmlFor="name">
        Меня зовут
      </label>
      <Input
        placeholder="Ваше имя"
        className="login-input"
        value={name}
        onChange={handleChange}
      />
      <Button className="login-button">Войти</Button>
    </form>
  );
};
