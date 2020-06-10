class UserInterface {
    constructor(scoreBoard) {
        this.scoreBoard = scoreBoard;
    }
    
    build() {
        const playingBoard = $('<div id="board">');
        const sidePanel = $('<div id="side">');
    
        // Board elements
        const scoreBoard = this.scoreBoard.htmlNode();
    
        const dealerPic = $('<div id="dealer-pic">');
        const dealerImg = $('<img id="dealer-img" src="img/dealer.png">');
        dealerImg.appendTo(dealerPic);
    
        const dealerArea = $('<div class="area" id="dealer-area">');
        const playerArea = $('<div class="area" id="player-area">');
    
        playingBoard.append(scoreBoard);
        playingBoard.append(dealerPic);
        playingBoard.append(dealerArea);
        playingBoard.append(playerArea);
    
        // Side panel elements
        const hitButton = $('<div class="button" id="hit">hit</div>');
        const deck = $('<div class="back card" id="deck"></div>');
        const standButton = $('<div id="stand" class="stand">stand</div>');
        const scoreHand = $('<div id="score-player">');
    
        sidePanel.append(hitButton);
        sidePanel.append(deck);
        sidePanel.append(standButton);
        sidePanel.append(scoreHand);
    
        // Append both elements to the body
        $('body').append(playingBoard);
        $('body').append(sidePanel);
    }
}

export {
    UserInterface
}