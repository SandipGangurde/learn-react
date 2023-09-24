import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AdminNavbar from "../Adminnavbar";
import { toast } from "react-toastify";

function Player() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);

  const loginCheck = () => {
    const user = JSON.parse(localStorage.getItem("Login"));
    if (!user) {
      navigate("/");
    }
  };

  const removePlayer = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:3001/players/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          toast.success("Removed successfully.");
          window.location.reload();
        })
        .catch((error) => {
          toast.error("Error:", error);
        });
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await fetch("http://localhost:3001/teams");
      setTeams(await response.json());
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  const fetchPlayers = async () => {
    try {
      const response = await fetch("http://localhost:3001/players");
      setPlayers(await response.json());
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  useEffect(() => {
    loginCheck();
    fetchPlayers();
    fetchTeams();
  }, []);

  const backDashboard = () => {
    navigate("/admin/dashboard");
  };

  const addPlayer = () => {
    navigate("/admin/player/add");
  };

  /**
   * Function to get team name by teamId
   * @param {*} teamId
   * @returns Team name
   */
  const getTeamNameById = (teamId) => {
    const team = teams.find((team) => team.id == teamId);
    return team ? team.name : "";
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4">
        <div className="card">
          <div className="card-title p-3">
            <div className="d-flex justify-content-between">
              <div></div>
              <h2 className="text-center">Players Listing</h2>
              <Button variant="btn btn-outline-primary" onClick={addPlayer}>
                Add Player
              </Button>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead className="bg-dark text-white">
                <tr>
                  <td>ID</td>
                  <td>First Name</td>
                  <td>Last Name</td>
                  <td>Email</td>
                  <td>Contact</td>
                  <td>Team</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {players &&
                  players.map((player) => (
                    <tr key={player.id}>
                      <td>{player.id}</td>
                      <td>{player.firstName}</td>
                      <td>{player.lastName}</td>
                      <td>{player.email}</td>
                      <td>{player.contact}</td>
                      <td>{getTeamNameById(player.teamId)}</td>
                      <td>
                        <a
                          onClick={() => {
                            removePlayer(player.id);
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
      </div>
    </>
  );
}

export default Player;
