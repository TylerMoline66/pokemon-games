// Pokémon Memory Match Game

import React, { useState, useEffect } from "react";

const PokemonMemoryMatch = () => {
  const [pokemonCards, setPokemonCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

  const fetchPokemon = async () => {
    const promises = Array.from({ length: 6 }, async () => {
      const randomId = Math.floor(Math.random() * 151) + 1;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      const data = await response.json();
      return {
        id: data.id,
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
      };
    });
    const results = await Promise.all(promises);
    const cards = [...results, ...results] // Duplicate cards for matching
      .sort(() => Math.random() - 0.5) // Shuffle the cards
      .map((card, index) => ({ ...card, index, isFlipped: false }));
    setPokemonCards(cards);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || pokemonCards[index].isFlipped) return;

    const newCards = [...pokemonCards];
    newCards[index].isFlipped = true;
    setPokemonCards(newCards);
    setFlippedCards((prev) => [...prev, index]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      const firstCard = pokemonCards[firstIndex];
      const secondCard = pokemonCards[secondIndex];

      if (firstCard.id === secondCard.id) {
        setMatchedPairs((prev) => prev + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          const newCards = [...pokemonCards];
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
          setPokemonCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Pokémon Memory Match</h1>
      <p>Matched Pairs: {matchedPairs}</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 100px)",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        {pokemonCards.map((card) => (
          <div
            key={card.index}
            onClick={() => handleCardClick(card.index)}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: card.isFlipped ? "white" : "gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid black",
            }}
          >
            {card.isFlipped && (
              <img src={card.image} alt={card.name} style={{ width: "80px" }} />
            )}
          </div>
        ))}
      </div>
      {matchedPairs === pokemonCards.length / 2 && (
        <h2>You caught them all!</h2>
      )}
    </div>
  );
};

export default PokemonMemoryMatch;
