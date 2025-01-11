import React, { useState, useEffect } from "react";

const WhosThatPokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");

  const fetchRandomPokemon = async () => {
    try {
      const randomId = Math.floor(Math.random() * 151) + 1; // Original 151 Pokémon
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      const data = await response.json();
      setPokemon({
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
      });
      setFeedback("");
      setGuess("");
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  const handleGuess = () => {
    if (guess.toLowerCase() === pokemon.name.toLowerCase()) {
      setFeedback("Correct! 🎉");
    } else {
      setFeedback(`Wrong! It's ${pokemon.name}.`);
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "2rem" }}>
      <h1>Who's That Pokémon?</h1>
      {pokemon ? (
        <div>
          <div
            style={{
              filter: feedback ? "none" : "brightness(0)",
              transition: "filter 0.5s ease",
            }}
          >
            <img
              src={pokemon.image}
              alt="Who's that Pokémon?"
              style={{ width: "300px", height: "300px" }}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <input
              type="text"
              value={guess}
              placeholder="Enter Pokémon's name"
              onChange={(e) => setGuess(e.target.value)}
              style={{
                padding: "0.5rem",
                fontSize: "1rem",
                marginRight: "0.5rem",
              }}
            />
            <button
              onClick={handleGuess}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Guess
            </button>
          </div>
          {feedback && (
            <div style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
              <p>{feedback}</p>
              <button
                onClick={fetchRandomPokemon}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "1rem",
                  cursor: "pointer",
                  marginTop: "0.5rem",
                }}
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading Pokémon...</p>
      )}
    </div>
  );
};

export default WhosThatPokemon;
