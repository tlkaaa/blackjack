import { useState } from "react";

import { Deck } from "./Deck";
import { Player } from "./Player";
import { GameContext } from "./context";
import Table from "./Table";
import { Game } from "./Game";
import { Dealer } from "./Dealer";

export default function MainGame() {
  const [game, setGame] = useState<Game>(
    new Game(
      [new Player(), new Player(), new Player(), new Player(), new Player()],
      new Dealer(),
      new Deck(4)
    )
  );
  const [step, setStep] = useState(0); // Increment by 1 when a game event happeneds

  return (
    <>
      <GameContext.Provider value={game}>
        <Table getStep={step} setStep={setStep} />
      </GameContext.Provider>
      <button
        className="bg-fuchsia-500 w-24 h-10 border-black border-solid"
        onClick={() => {
          setGame(
            new Game(
              [
                new Player(),
                new Player(),
                new Player(),
                new Player(),
                new Player(),
              ],
              new Dealer(),
              new Deck(4)
            )
          );
          setStep(0);
        }}
      >
        New Game
      </button>
      <button
        className="bg-emerald-600 w-24 h-10 border-black border-solid"
        onClick={() => {
          game.setStarted();
          setStep(step + 1);
        }}
      >
        Start Game
      </button>
    </>
  );
}
