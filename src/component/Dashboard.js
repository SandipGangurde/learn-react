// src/components/Dashboard.js
import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate, Link } from "react-router-dom";
import PlayerList from "./Playerlist";
import AddPlayerForm from "./AddPlayerForm";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("Login"));
    if (user) {
    } else {
      navigate("/");
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div>
        <h2>Welcome to the Dashboard!</h2>
        <button className="btn btn-primary" onClick={logout}>
          Logout
        </button>
      </div>

      <PlayerList />
    </>
  );
};

export default Dashboard;
