import { Card } from "./Deck";

export class Dealer {
    private hand: Card[];
    private handPoints: number;
    private aceCount: number;

    constructor() {
        this.hand = [];
        this.handPoints = 0;
        this.aceCount = 0
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

}