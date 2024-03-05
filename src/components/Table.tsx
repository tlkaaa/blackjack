import { useContext, useEffect } from "react";
import CardContainer from "./CardContainer";
import { GameContext } from "./context";
import { Player } from "./Player";
import { v4 as uuidv4 } from "uuid";
import DealerContainer from "./DealerContainer";

export type SetUp = {
  getStep: number;
  setStep: Function;
};

export default function Table(props: SetUp) {
  const game = useContext(GameContext);

  return (
    <>
      <div className="w-full bg-green-700 h-screen absolute flex -z-20">
        <div className="absolute h-96 w-5/12 bg-green-800 mx-auto rounded-b-full inset-0 -z-10"></div>
        <div className="h-5/6 w-full mt-10 flex justify-around z-20">
          {game!.getPlayers().map((player: Player) => (
            <CardContainer key={uuidv4()} currentPlayer={player} step={props} />
          ))}
          {game.checkTurn() === game.getDealer() && (
            <DealerContainer step={props} />
          )}
        </div>
      </div>
    </>
  );
}
