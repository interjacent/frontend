import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Main } from "./Components/Pages/Main";
import { User } from "./Components/Pages/User";
import { Admin } from "./Components/Pages/Admin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/poll/:publicPollId" element={<User />} />
          <Route path="/poll/:publicPollId/:privatePollId" element={<Admin />} />
          <Route path="/mvp" element={"Mococo Very Pretty"} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
