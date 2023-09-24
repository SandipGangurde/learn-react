// src/components/Dashboard.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminNavbar from "./Adminnavbar";

const Dashboard = () => {
  const navigate = useNavigate();

  const notify = (message) => {
    toast(message);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("Login"));
    if (!user) {
      navigate("/");
    }
  }, []);

  

  return (
    <>
      <div>
        <AdminNavbar />
        <h2>Welcome to the Dashboard!</h2>
      </div>
    </>
  );
};

export default Dashboard;