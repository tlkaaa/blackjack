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
    
    constructor(allPlayer: Player[] , currentDealer: Dealer, currentDeck: Deck) {
        this.players = allPlayer;
        this.deck = currentDeck;
        this.dealer = currentDealer;
        this.currentTurn = null;
        this.playerIndex = 0;
        this.started = false;
    }

    getPlayers() {
        return this.players;
    }

    getDealer() {
        return this.dealer;
    }

    getDeck() {
        return this.deck;
    }

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

    checkTurn(){
        return this.currentTurn;
    }
    
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

    setStarted() {
        this.started = true;

        while (this.players[this.playerIndex].getIsPlaying() === false) {
            this.playerIndex = this.playerIndex + 1
        }

        this.currentTurn = this.players[this.playerIndex];

    }

    isStarted() {
        return this.started;
    }

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