class Hand {
    constructor(cards) {
        this.cards = cards;
        this.maxScore = 21;
    }

    blackjack() {
        return (this.score() === this.maxScore);
    }

    busted() {
        return (this.score() > this.maxScore);
    }

    score() {
        let score = this.cards.reduce((acc, x) => acc + x.value, 0);
        
        for (const ace of this.cards.filter(card => card.name === 'A')) {
            if (score > this.maxScore) score -= 10;
            else break;
        }
        
        return score;
    }

    hit(card) {
        this.cards.push(card);
    }
}

class PlayerHand extends Hand {
    constructor(deck) {
        super(deck);
    }

    update() {
        $('#player-area').html("");
        this.cards.forEach(card => $('#player-area').append(card.createFrontHTML()));
    }
    
    updateScore() {
        $('#score-player').text(this.score());
    }
}

class DealerHand extends Hand {
    constructor(deck) {
        super(deck);
    }

    update() {
        $('#dealer-area').html("");
        this.cards.forEach(card => $('#dealer-area').append(card.createFrontHTML()));
    }

    updateScore() {
        $('#side').append($('<div id="score-dealer">'));
        $('#score-dealer').text(this.score());
    }
}

export {
    PlayerHand,
    DealerHand
}