import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AdminNavbar from "../Adminnavbar";
import { toast } from "react-toastify";

function Team() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);

  /**
   * checks loggedin user present or not
   */
  const loginCheck = () => {
    const user = JSON.parse(localStorage.getItem("Login"));
    if (!user) {
      navigate("/");
    }
  };

  /**
   * It removes team from json server
   * @param {*} id : it is team id
   */
  const removeTeam = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:3001/teams/" + id, {
        method: "DELETE",
      })
        .then(() => {
          toast.success("Removed successfully.");
          fetchTeams();
        })
        .catch((error) => {
          toast.error("Error:", error);
        });
    }
  };

  /**
   * 
   */
  const fetchTeams = async () => {
    try {
      const response = await fetch("http://localhost:3001/teams");
      setTeams(await response.json());
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  useEffect(() => {
    loginCheck();
    fetchTeams();
  }, []);

  const backDashboard = () => {
    navigate("/admin/dashboard");
  };

  const addTeam = () => {
    navigate("/admin/team/add");
  };

  return (
    <>
      <AdminNavbar />
      <div className="container">
        <div className="d-flex justify-content-between m-2">
          <div></div>
          <h2 className="text-center">Teams</h2>
          <Button variant="btn btn-outline-warning" onClick={addTeam}>
            Add Team
          </Button>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-primary">
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Description</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {teams &&
                teams.map((team) => (
                  <tr key={team.id}>
                    <td>{team.id}</td>
                    <td>{team.name}</td>
                    <td>{team.description}</td>
                    <td>
                      <a
                        onClick={() => {
                          removeTeam(team.id);
                        }}
                        className="btn btn-outline-danger"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Team;
