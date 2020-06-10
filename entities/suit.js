class Suit {
    constructor(suit) {
        this.suit = suit;
        this.symbolMap = { 
            'S': '♠︎',
            'H': '♥︎',
            'C': '♣︎',
            'D': '♦︎'
        }
    }

    symbol() {
        return this.symbolMap[this.suit];
    }

    color() {
        return (this.suit === 'S' || this.suit === 'C') ? 'black' : 'red';
    }
}

export {
    Suit
}