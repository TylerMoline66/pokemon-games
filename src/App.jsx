import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import WhosThatPokemon from "./components/WhosThatPokemon";
import CatchThePokemon from "./components/CatchThePokemon";
import PokemonMemoryMatch from "./components/PokemonMemoryMatch";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      {/* <WhosThatPokemon /> */}
      {/* <CatchThePokemon /> */}
      {/* <PokemonMemoryMatch /> */}

      <Router>
        <nav>
          <Link to="/pokemon-games/">Home</Link>
          <Link to="/pokemon-games/whos-that-pokemon">Whos that pokemon</Link>
          <Link to="/pokemon-games/pokemon-memory-match">Memory Match</Link>
          <Link to="/pokemon-games/catch-the-pokemon">Catch The Pokemon</Link>
        </nav>
        <Routes>
          <Route path="/pokemon-games" element={<HomePage />} />
          <Route
            path="/pokemon-games/whos-that-pokemon"
            element={<WhosThatPokemon />}
          />
          <Route
            path="/pokemon-games/pokemon-memory-match"
            element={<PokemonMemoryMatch />}
          />
          <Route path="/catch-the-pokemon" element={<CatchThePokemon />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
