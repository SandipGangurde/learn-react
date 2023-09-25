// src/components/Dashboard.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./Adminnavbar";

const Dashboard = () => {
  const navigate = useNavigate();

  /**
   * Effect hook: Check if the user is logged in
   */
  useEffect(() => {
    // Retrieve user data from local storage
    const user = JSON.parse(localStorage.getItem("Login"));
    // If no user is found, navigate back to the login page
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <AdminNavbar />
      <div className="text-center">
        <h2>Welcome to the Dashboard!</h2>
      </div>
    </>
  );
};

export default Dashboard;
