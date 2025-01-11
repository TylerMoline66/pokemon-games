import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import WhosThatPokemon from "./components/WhosThatPokemon";
import CatchThePokemon from "./components/CatchThePokemon";
import PokemonMemoryMatch from "./components/PokemonMemoryMatch";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <WhosThatPokemon /> */}
      {/* <CatchThePokemon /> */}
      <PokemonMemoryMatch />
    </>
  );
}

export default App;
