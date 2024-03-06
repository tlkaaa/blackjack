import { Dealer } from "./Dealer";
import { Deck } from "./Deck";
import { Player } from "./Player";

export class Game {
    private dealer: Dealer;
    private players: Player[];
    private deck: Deck;
    private currentTurn: Player | Dealer | null;
    private playerIndex: number
    private started: boolean;

    /**
     * Manage a round of a black-jack game
     * 
     * @param allPlayer - All player instances in this round 
     * @param currentDealer - Dealer instance in this round 
     * @param currentDeck - The Deck instance of cards used 
     */
    constructor(allPlayer: Player[] , currentDealer: Dealer, currentDeck: Deck) {
        this.players = allPlayer;
        this.deck = currentDeck;
        this.dealer = currentDealer;
        this.currentTurn = null;
        this.playerIndex = 0;
        this.started = false;
    }

    /**
     * Return all players in this round
     * @returns all player instances
     */
    getPlayers() {
        return this.players;
    }

    /**
     * Return Dealer in this round
     * @returns dealer instance
     */
    getDealer() {
        return this.dealer;
    }

    /**
     * Return Deck
     * @returns Deck instance
     */
    getDeck() {
        return this.deck;
    }

    /**
     * Return the current player or dealer's card points as a string
     * If one or more Ace in hand, calculate the total points of hand
     * as Ace is 1 and 11. If Ace as 11 and total points exceed 21 points,
     * Ace will only equals to 1
     * @param current instance of current player of dealer
     * @returns total points as string (if Ace is present in hand {A,10} => "11/21")
     */
    getTotalPoints(current: Player | Dealer) {
        if (current instanceof Player) {

            let temp: Player | null = null;

            this.players.forEach((player: Player) => {
                player == current && (temp = player)
            });

            if (temp!.getHandPoints()[1] > 0 && temp!.getHandPoints()[0] + (10 * temp!.getHandPoints()[1]) < 21) {
                return `${temp!.getHandPoints()[0]}` + " / " + `${temp!.getHandPoints()[0] + (10 * temp!.getHandPoints()[1])}`;
                
            } else {
                return `${temp!.getHandPoints()[0]}`;
            }
        } else {
            if (current.getHandPoints()[1] > 0 && current.getHandPoints()[0] + (10 * current.getHandPoints()[1]) < 21) {
                return `${current.getHandPoints()[0]}` + " / " + `${current.getHandPoints()[0] + (10 * current.getHandPoints()[1])}`;
                
            } else {
                return `${current.getHandPoints()[0]}`;
            }
        }
        
    }

    /**
     * Return the instance that is in current turn
     * @returns return instance of current turn 
     */
    checkTurn(){
        return this.currentTurn;
    }
    
    /**
     * Change currentTurn to the next instance
     * @param check - string to indicate deal or hold for player
     */
    nextTurn(check: string) {

         if ((this.currentTurn !== null && this.currentTurn!.getHandPoints()[0] >= 21 && check === "check") || check === "stand") {
            this.playerIndex = this.playerIndex + 1;
            while (this.playerIndex < 5) {
                
                if (this.players[this.playerIndex].getIsPlaying() === true) {
                    this.currentTurn = this.players[this.playerIndex];
                    break;
                }   
                this.playerIndex = this.playerIndex + 1;
            }
        } 
        
        if (this.playerIndex == 5) {
            this.currentTurn = this.dealer;
        }
    }

    /**
     * Set the round start to true
     */
    setStarted() {
        this.started = true;

        while (this.players[this.playerIndex].getIsPlaying() === false) {
            this.playerIndex = this.playerIndex + 1
        }

        this.currentTurn = this.players[this.playerIndex];

    }

    /**
     * Return whether the game started or not
     * @returns true if yes, else false
     */
    isStarted() {
        return this.started;
    }

    /**
     * Dealer will draw cards untill its hand reached 17 or more
     */
    dealerPlay() {
        while (true) {

            if (this.dealer.getHandPoints()[1] > 0 && this.dealer.getHandPoints()[0] + (10 * this.dealer.getHandPoints()[1]) >= 17) {
                break;
            } else if (this.dealer.getHandPoints()[1] === 0 && this.dealer.getHandPoints()[0] >= 17) {
                break;
            }

            this.dealer.addCard(this.deck.dealCard()!);

        }
    }

    /**
     * Check whether the player has won after dealer draw its cards
     */
    win() {
        if (this.dealer.getHandPoints()[0] > 21) {
            this.players.forEach((player)=> {
                if (player.getIsPlaying() === true) {
                    player.setWin();
                }
            })
        } else if (this.dealer.getHandPoints()[0] < 21) {
            this.players.forEach((player)=> {
                if (player.getIsPlaying() === true && player.getHandPoints()[1] == 0 && player.getHandPoints()[0] > this.dealer.getHandPoints()[0]) {
                    player.setWin();
                } else if (player.getIsPlaying() === true && player.getHandPoints()[1] > 0 && (player.getHandPoints()[0] + (10 * player.getHandPoints()[1])) > this.dealer.getHandPoints()[0]) {
                    player.setWin();
                }
            })
        } 
    }

}