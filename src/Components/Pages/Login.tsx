import React, {useState} from "react";
import './Login.css';

export const Login = () => {
  const [name, setName] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div className="login-container">
      <label className="container-label" htmlFor="name">Меня зовут</label>
      <input
        type="text"
        id="name"
        className="login-input"
        value={name}
        onChange={handleChange}
      />
      <button className="login-button" onClick={() => console.log(name)}>Войти</button>
    </div>
  )
}
