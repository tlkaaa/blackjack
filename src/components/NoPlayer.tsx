import { useContext } from "react";
import { Player } from "./Player";
import { SetUp } from "./Table";
import { GameContext } from "./context";

type Playing = {
  player: Player;
  step: SetUp;
};

export default function Noplayer(props: Playing) {
  const game = useContext(GameContext);

  return (
    <>
      {game.isStarted() === false && (
        <button
          className="bg-gray-400 size-12 text-xl rounded-full -pt-4 items-center"
          onClick={() => {
            props.player.setIsPlaying();
            props.step.setStep(props.step.getStep + 1);
          }}
        >
          ➕
        </button>
      )}
    </>
  );
}
