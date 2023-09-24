import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import Team from "./component/team/Team";
import AddTeam from "./component/team/AddTeam";
import Player from "./component/player/Player";
import AddPlayer from "./component/player/AddPlayer";
import Footer from "./component/Footer";

function App() {
  return (
    <>
      <div className="content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login></Login>} />
            <Route path="/admin/dashboard" element={<Dashboard></Dashboard>} />
            <Route path="/admin/player" element={<Player></Player>} />
            <Route path="/admin/team" element={<Team></Team>} />
            <Route path="/admin/team/add" element={<AddTeam></AddTeam>} />
            <Route path="/admin/player/add" element={<AddPlayer></AddPlayer>} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
}

export default App;
