import { Deck } from "./Deck";

export default function useDeal(deck: Deck) {
  if (deck === undefined) {
    throw new Error("Please add a deck");
  }
  return deck.dealCard();
}
