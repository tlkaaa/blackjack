import { createContext } from "react";
import { Game } from "./Game";
import { Player } from "./Player";
import { Dealer } from "./Dealer";
import { Deck } from "./Deck";

export const GameContext = createContext<Game>(
  new Game(
    [new Player(), new Player(), new Player(), new Player(), new Player()],
    new Dealer(),
    new Deck(4)
  )
);
