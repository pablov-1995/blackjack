class ScoreBoard {
    constructor() {
        this.player = 0;
        this.dealer = 0;
    }

    get playerScore() {
        return this.player;
    }

    get dealerScore() {
        return this.player;
    }

    bumpPlayerScore() {
        this.player++;
    }
    
    bumpDealerScore() {
        this.dealer++;
    }

    htmlNode() {
        const node= $('<div id="scoreboard">');
        const nodeContent = `You <strong>${this.player} - ${this.dealer}</strong> Dealer`;
        node.html(nodeContent);
        return node;
    }
}

export {
    ScoreBoard
}