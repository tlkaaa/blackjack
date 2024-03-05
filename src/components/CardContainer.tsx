import { Card } from "./Deck";
import PlayingCard from "./PlayingCard";
import { v4 as uuidv4 } from "uuid";
import { Player } from "./Player";
import { useContext } from "react";
import { GameContext } from "./context";
import { SetUp } from "./Table";
import Noplayer from "./NoPlayer";

type CurrentPlayer = {
  currentPlayer: Player;
  step: SetUp; //in Table.tsx
};

export default function CardContainer(props: CurrentPlayer) {
  const game = useContext(GameContext);

  return (
    <div
      className={`w-2/12  h-64 mx-3 z-10 mt-96 inline-block flex justify-center items-center flex-col`}
    >
      {props.currentPlayer.getIsPlaying() && (
        <>
          <p className="absolute -mt-56">
            Total: {game.getTotalPoints(props.currentPlayer)}
          </p>
          <div className="flex justify-center items-center relative">
            {props.currentPlayer!.getHand().map((card: Card) => (
              <div key={uuidv4()}>
                <PlayingCard suit={card.suit} numeral={card.numeral} />
              </div>
            ))}
          </div>
          {props.currentPlayer!.getHandPoints()[0] < 21 &&
            game.checkTurn() === props.currentPlayer && (
              <>
                <button
                  className="bg-cyan-400 w-24 h-10 mt-60 absolute"
                  onClick={() => {
                    let card = game!.getDeck().dealCard()!;
                    props.currentPlayer!.addCard(card);
                    game.nextTurn("check");
                    props.step.setStep(props.step.getStep + 1);
                  }}
                >
                  Deal
                </button>
                <button
                  className="bg-red-700 w-24 h-10 mt-96 absolute"
                  onClick={() => {
                    game.nextTurn("stand");
                    props.step.setStep(props.step.getStep + 1);
                  }}
                >
                  Stand
                </button>
              </>
            )}
        </>
      )}
      {!props.currentPlayer.getIsPlaying() && (
        <Noplayer player={props.currentPlayer} step={props.step} />
      )}
    </div>
  );
}
