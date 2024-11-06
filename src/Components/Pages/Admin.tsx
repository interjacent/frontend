import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import "./Admin.css";

export const Admin = () => {
  const users = ["Фырфырчик", "Пырпырчик", "Мявка", "Пырчик"];
  return (
    <div className="admin-page">
      <div className="header">Управление</div>
      <div className="panels">
        <div className="left">
          <div>Ссылка для голосования</div>
          <Input value="https://interjacent/aabbccdd" />
          <div>Участники</div>
          <div>
            <ul>
              {users.map((user) => (
                <li>{user}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="right">
          <div>
            Я хочу организовать встречу на <input />:<input />
          </div>
          <Button>Организовать</Button>
          <div>
            <div>Удобное для всех время</div>
          </div>
        </div>
      </div>
    </div>
  );
};
