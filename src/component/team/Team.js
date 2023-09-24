import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AdminNavbar from "../Adminnavbar";

function Team() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);

  const loginCheck = () => {
    const user = JSON.parse(localStorage.getItem("Login"));
    if (!user) {
      navigate("/");
    }
  };

  const removeTeam = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:3001/teams/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed successfully.");
          console.log("deleted", res);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const fetchPlayers = async () => {
    try {
      debugger;
      const response = await fetch("http://localhost:3001/teams");
      setTeams(await response.json());
      console.log(teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    loginCheck();
    fetchPlayers();
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
      <div className="container mt-4">
        <div className="card">
          <div className="card-title p-3">
            <div className="d-flex justify-content-between">
              <div></div>
              <h2 className="text-center">Teams Listing</h2>
              <Button variant="btn btn-outline-primary" onClick={addTeam}>
                Add Team
              </Button>
            </div>
          </div>
          <div className="card-body">
            <div className="divbtn">
              {/* <Link to="employee/create" className="btn btn-success">Add New (+)</Link> */}
            </div>
            <table className="table table-bordered">
              <thead className="bg-dark text-white">
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
                          className="btn btn-danger"
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
      </div>
    </>
  );
}

export default Team;
