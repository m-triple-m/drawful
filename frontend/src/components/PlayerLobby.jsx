import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const PlayerLobby = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('playerJoined', (player) => {
            setPlayers((prevPlayers) => [...prevPlayers, player]);
        });

        socket.on('playerLeft', (playerId) => {
            setPlayers((prevPlayers) => prevPlayers.filter(player => player.id !== playerId));
        });

        return () => {
            socket.off('connect');
            socket.off('playerJoined');
            socket.off('playerLeft');
        };
    }, []);

    return (
        <div>
            <h1>Player Lobby</h1>
            <ul>
                {players.map(player => (
                    <li key={player.id}>{player.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PlayerLobby;