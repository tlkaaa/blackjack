import { Card } from "./Deck";

export class Player {
    private hand: Card[];
    private handPoints: number;
    private aceCount: number;
    private isPlaying: boolean;
    private won: boolean;

    constructor() {
        this.hand = [];
        this.handPoints = 0;
        this.aceCount = 0;
        this.isPlaying = false;
        this.won = false;
    }

    addCard(card: Card) {
        if (card.numeral === "J" || card.numeral === "Q" || card.numeral === "K") {
            this.handPoints = this.handPoints + 10;
        } else if (card.numeral === "A") {
            this.handPoints = this.handPoints + 1;
            this.aceCount++;
        } else {
            this.handPoints = this.handPoints + parseInt(card.numeral);
        }
        this.hand.push(card);
    }

    getHand() {
        return this.hand;
    }

    getHandCount() {
        return this.hand.length;
    }

    getHandPoints() {
        return [this.handPoints, this.aceCount];
    }

    setIsPlaying() {
        this.isPlaying === false ? this.isPlaying = true : this.isPlaying = false;
    }

    getIsPlaying() {
        return this.isPlaying;
    }

    setWin() {
        this.won = true;
    }

    hasWon() {
        return this.won
    }
 
}