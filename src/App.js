import React from "react";
import { BrowserRouter, Route, Routes, Router, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./component/Login";
import Signup from "./component/Signup";
import Dashboard from "./component/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/dashboard" element={<Dashboard></Dashboard>} />
        <Route path="/" element={<Login></Login>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
