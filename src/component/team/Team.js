import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AdminNavbar from "../Adminnavbar";
import { toast } from "react-toastify";
import DeleteConfirmDialog from "../modals/DeleteConfirmDialog";

function Team() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);

  /**
   * Function to fetch teams for listing
   */
  const fetchTeams = async () => {
    try {
      const response = await fetch("http://localhost:3001/teams");
      setTeams(await response.json());
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  /**
   * Effect hook: Check if the user is logged in and fetch teams if logged in
   */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("Login"));
    if (!user) {
      navigate("/");
    } else {
      fetchTeams();
    }
  }, [navigate]);

  /**
   * Function to navigate to the "Add Team" form
   */
  const addTeam = () => {
    navigate("/admin/team/add");
  };

  /**
   * Function to handle the "Remove" button click and open the delete confirm dialog
   * @param {*} team Team to be removed
   */
  const handleDelete = (player) => {
    setTeamToDelete(player);
    setShowConfirmDialog(true);
  };

  /**
   * Function to confirm and perform the team deletion
   */
  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/teams/${teamToDelete.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Removed successfully.");
        fetchTeams(); // Fetch data again after successful deletion
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
          <h2 className="text-center">Teams</h2>
          <Button variant="btn btn-outline-warning" onClick={addTeam}>
            Add Team
          </Button>
        </div>
        <div className="table-responsive custom-table-body">
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
                      <span
                        onClick={() => {
                          handleDelete(team);
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
          teamToDelete ? teamToDelete.name : " this item"
        }?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
}

export default Team;
