// Catch the Pokémon Game

import React, { useState, useEffect } from "react";

const CatchThePokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [trainerPosition, setTrainerPosition] = useState(50);

  const fetchRandomPokemon = async () => {
    try {
      const randomId = Math.floor(Math.random() * 151) + 1;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      const data = await response.json();
      return {
        id: data.id,
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
        position: Math.random() * 80,
        speed: Math.random() * 3 + 2,
      };
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      return null;
    }
  };

  const addNewPokemon = async () => {
    const newPokemon = await fetchRandomPokemon();
    if (newPokemon) {
      setPokemon((prev) => [...prev, newPokemon]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => addNewPokemon(), 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setPokemon((prev) =>
        prev.map((p) => ({ ...p, positionY: (p.positionY || 0) + p.speed }))
      );
    }, 100);
    return () => clearInterval(gameLoop);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      setTrainerPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setTrainerPosition((prev) => Math.min(90, prev + 5));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const checkCollisions = () => {
    setPokemon((prev) => {
      return prev.filter((p) => {
        if (p.positionY > 90) {
          if (Math.abs(p.position - trainerPosition) < 10) {
            setScore((score) => score + 1);
            return false; // Caught Pokémon
          } else {
            setMissed((missed) => missed + 1);
            return false; // Missed Pokémon
          }
        }
        return true;
      });
    });
  };

  useEffect(() => {
    const collisionCheck = setInterval(() => checkCollisions(), 100);
    return () => clearInterval(collisionCheck);
  }, [trainerPosition]);

  return (
    <div style={{ textAlign: "center", position: "relative", height: "500px" }}>
      <h1>Catch the Pokémon!</h1>
      <p>
        Score: {score} | Missed: {missed}
      </p>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "90%",
          backgroundColor: "#f0f8ff",
          border: "1px solid black",
          overflow: "hidden",
        }}
      >
        {pokemon.map((p) => (
          <img
            key={p.id}
            src={p.image}
            alt={p.name}
            style={{
              position: "absolute",
              left: `${p.position}%`,
              top: `${p.positionY || 0}%`,
              width: "50px",
              height: "50px",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: `${trainerPosition}%`,
            width: "50px",
            height: "50px",
            backgroundColor: "red",
          }}
        >
          Trainer
        </div>
      </div>
    </div>
  );
};

export default CatchThePokemon;
