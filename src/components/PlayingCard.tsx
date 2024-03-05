import { useEffect, useState } from "react";
import { Card } from "./Deck";

export default function PlayingCard(props: Card) {
  // const icon = useRef("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("text-black");
  // const color = useRef("text-black");

  useEffect(() => {
    switch (props.suit) {
      case "Hearts":
        setIcon("♥");
        setColor("text-red-600");
        break;
      case "Spades":
        setIcon("♠");
        break;
      case "Clubs":
        setIcon("♣");
        break;
      case "Diamonds":
        setIcon("♦");
        setColor("text-red-600");
        break;
    }
  }, []);

  return (
    <>
      <div className="h-24 w-16 rounded border border-black bg-white -mx-4">
        <p className={"ms-2 " + color}>{props.numeral}</p>
        <p className={"ms-2 " + color}>{icon}</p>
      </div>
    </>
  );
}
