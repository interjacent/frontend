import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/mvp" element={"Mococo Very Pretty"} />
          <Route path="*" element={<h1>Interjacent project</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
