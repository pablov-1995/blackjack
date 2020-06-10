import { Card } from './card.js';

class Deck {
    constructor() {
        const suits = ['S', 'H', 'C', 'D'];
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        this.cards = [];
        for (const suit of suits) {
            ranks.forEach(rank => this.cards.push(new Card(rank, suit)));
        }
    }

    shuffle(times) {
        for (let i = 0; i < times; i++) {
            this.cards.forEach(card => {
                const i = Math.floor(Math.random() * this.cards.length);
                this.cards.unshift(this.cards[i]);
                this.cards.splice(i+1, 1);
            })
        }
    }

    deal() {
        return this.cards.pop();
    }

    dealHand() {
        return [this.deal(), this.deal()];
    }
}

export {
    Deck
}