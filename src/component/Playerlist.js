// src/components/PlayerList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import EditPlayerForm from "./EditPlayerForm";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [editingPlayerId, setEditingPlayerId] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/players");
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  const handleEditClick = (playerId) => {
    setEditingPlayerId(playerId);
  };

  const handlePlayerUpdated = (updatedPlayer) => {
    // Update the player in the local state
    const updatedPlayers = players.map((player) =>
      player.id === updatedPlayer.id ? updatedPlayer : player
    );
    setPlayers(updatedPlayers);
    setEditingPlayerId(null); // Clear editing state
  };

  return (
    <div>
      <h2>Player List</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.firstName} {player.lastName} - {player.email} -{" "}
            {player.contact}
            <button onClick={() => handleEditClick(player.id)}>Edit</button>
            <button>Delete</button>
            {editingPlayerId === player.id && (
              <EditPlayerForm
                playerId={player.id}
                onCancel={() => setEditingPlayerId(null)}
                onPlayerUpdated={handlePlayerUpdated}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
