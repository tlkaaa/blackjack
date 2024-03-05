export type Card = {
    suit: Suits,
    numeral: Numeral
}

const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'] as const;
type Suits = typeof suits[number];

const numeral = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;
type Numeral = typeof numeral[number];


export class Deck {
    private cards: Card[];
    
    constructor(deckCount: number) {
        this.cards = [];
        
        suits.forEach((suit: Suits) => {
            numeral.forEach((numeral: Numeral) => {
                this.cards.push({suit, numeral});
            })
        });

        // Add deck based on deckCount
        if (deckCount > 1) {
            let temp = this.cards.slice();
            for(let i = 1; i < deckCount; i++) {
                this.cards = this.cards.concat(temp);
            }
        }

        // Shuffle using Fisher–Yates shuffle
        for(let j = this.cards.length - 1; j >= 1; j-- ) {
            let k: number = Math.floor(Math.random() * j);
            let temp: Card = this.cards[k];
            this.cards[k] = this.cards[j];
            this.cards[j] = temp;
        }


    }

    getCards() {
        return this.cards;
    }

    dealCard() {
        return this.cards.pop();
    }


}