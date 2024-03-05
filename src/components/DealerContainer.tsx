import { useContext, useEffect } from "react";
import { SetUp } from "./Table";
import { GameContext } from "./context";
import { Card } from "./Deck";
import { v4 as uuidv4 } from "uuid";

import PlayingCard from "./PlayingCard";

type GameDealer = {
  step: SetUp;
};

export default function DealerContainer(props: GameDealer) {
  const game = useContext(GameContext);

  useEffect(() => {
    game.dealerPlay();
    props.step.setStep(props.step.getStep + 1);
  }, []);

  return (
    <div
      className={`w-2/12 h-64 mx-3 mt-10 z-10 flex justify-center items-center flex-col absolute`}
    >
      <p className="absolute -mt-56">
        Total: {game.getTotalPoints(game.getDealer())}
      </p>
      <div className="flex justify-center items-center relative">
        {game
          .getDealer()
          .getHand()
          .map((card: Card) => (
            <div key={uuidv4()}>
              <PlayingCard suit={card.suit} numeral={card.numeral} />
            </div>
          ))}
      </div>
    </div>
  );
}
