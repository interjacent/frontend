import "./Main.css";

export const Main = () => {
  return (
    <div className="container-center">
      <div className="main-page">
        <div className="logo">interjacent</div>
        <div>Мы готовы провести встречу в</div>
        <div className="checkboxes">
          <span>Пн</span>
          <span>Вт</span>
          <span>Ср</span>
          <span>Чт</span>
          <span>Пт</span>
          <span>Сб</span>
          <span>Вс</span>
        </div>
        <div>с 8:00 до 23:00</div>
      </div>
    </div>
  );
};
