import {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  useState,
} from "react";
import "./Login.css";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

export const Login = () => {
  const [name, setName] = useState<string>("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log(name);
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
