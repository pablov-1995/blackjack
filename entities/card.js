import { Suit } from './suit.js'

class Card {
    constructor(name, suit) {
        this.name = name;
        this.suit = new Suit(suit);
    }

    get value() {
        if ((this.name) === 'A') return 11;
        else if (['J', 'Q', 'K'].includes(this.name)) return 10;
        else return Number(this.name);
    }

    createFrontHTML() {
        const cardNode = $('<div class="card">');
        
        // Card name
        const nameSubNode = $('<div class="card-val">' + this.name + '</div>');
        nameSubNode.appendTo(cardNode);

        // Card suit
        const suitSubNode = $('<div class="card-suit">' + this.suit.symbol() + '</div>');
        suitSubNode.css('color', this.suit.color());
        suitSubNode.appendTo(cardNode);

        return cardNode;
    }

    createBackHTML() {
        return $('<div class="card back">');
    }
}

export {
    Card
}