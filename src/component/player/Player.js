import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AdminNavbar from "../Adminnavbar";
import { toast } from "react-toastify";
import DeleteConfirmDialog from "../modals/DeleteConfirmDialog";

function Player() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(null);

  /**
   * Function to fetch teams
   */
  const fetchTeams = async () => {
    try {
      const response = await fetch("http://localhost:3001/teams");
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  /**
   * Function to fetch players for listing
   */
  const fetchPlayers = async () => {
    try {
      const response = await fetch("http://localhost:3001/players");
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  /**
   * Effect hook: Check if the user is logged in and fetch teams and players if logged in
   */
  useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem("Login"));
    if (!loginUser) {
      navigate("/");
    } else {
      fetchTeams();
      fetchPlayers();
    }
  }, [navigate]);

  /**
   * Function to navigate to the "Add Player" page
   */
  const addPlayer = () => {
    navigate("/admin/player/add");
  };

  /**
   * Function to get team name by teamId
   * @param {*} teamId
   * @returns Team name
   */
  const getTeamNameById = (teamId) => {
    if (typeof teamId === "string") {
      teamId = +teamId; // Convert to number only if it's a string
    }
    const team = teams.find((team) => team.id === teamId);
    return team ? team.name : "";
  };

  /**
   * Function to handle the "Remove" button click
   * @param {*} player Remove player set and open delete confirm dialog
   */
  const handleDelete = (player) => {
    setPlayerToDelete(player);
    setShowConfirmDialog(true);
  };

  /**
   * Function to confirm and perform the player deletion
   */
  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/players/${playerToDelete.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Removed successfully.");
        fetchPlayers(); // Fetch data again after successful deletion
      } else {
        toast.error("Failed to delete.");
      }
    } catch (error) {
      toast.error("Error:", error);
    } finally {
      setShowConfirmDialog(false); // Close the confirmation dialog
    }
  };

  /**
   * Function to cancel the delete operation and close the confirmation dialog
   */
  const cancelDelete = () => {
    setShowConfirmDialog(false);
  };

  return (
    <>
      <AdminNavbar />
      <div className="container">
        <div className="d-flex justify-content-between m-2">
          <div></div>
          <h2 className="text-center">Players</h2>
          <Button variant="btn btn-outline-warning" onClick={addPlayer}>
            Add Player
          </Button>
        </div>
        <div className="table-responsive custom-table-body">
          <table className="table table-bordered table-hover">
            <thead className="table-primary">
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
                      <span
                        onClick={() => {
                          handleDelete(player);
                        }}
                        className="btn btn-outline-danger"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render the ConfirmDialog */}
      <DeleteConfirmDialog
        show={showConfirmDialog}
        message={`Are you sure you want to delete ${
          playerToDelete
            ? playerToDelete.firstName + " " + playerToDelete.lastName
            : "this item"
        }?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
}

export default Player;
