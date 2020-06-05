// Declaring deck and score globally
var deck;
var scoreHistoric = [0, 0];

// Classes for the game

class Card {
    
    constructor(name, suit) {
        const invalidName = ![...Array(11).keys()].slice(2).map(String).concat(['J', 'Q', 'K', 'A']).includes(name);
        const invalidSuit = !['S', 'H', 'C', 'D'].includes(suit);
        
        if (invalidName || invalidSuit) throw 'Error: the input you provided for name and/or suit of the card is invalid. Please try again.'
        
        this._name = name;
        this._suit = suit;
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        throw 'Alert: the properties of this object shoudln\'t be modified manually.'
    }

    get suit() {
        return this._suit;
    }

    set value(newValue) {
        throw 'Alert: the properties of this object shoudln\'t be modified manually.'
    }

    get value() {
        if ((this.name) === 'A') return 11;
        else if (['J', 'Q', 'K'].includes(this.name)) return 10;
        else return Number(this.name);
    }
}

class Deck {
    constructor() {
        const suits = ['S', 'H', 'C', 'D'];
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        this._cards = [];
        for (const suit of suits) {
            ranks.forEach(rank => this.cards.push(new Card(rank, suit)))
        }
    }

    get cards() {
        return this._cards;
    }

    set cards(newCards) {
        throw 'Alert: the properties of this object shoudln\'t be modified manually.'
    }

    shuffle(times = 1) {
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
}

class Hand {
    constructor() {
        this._cards = [];
        this._cards.push(deck.deal());
        this._cards.push(deck.deal());
    }

    get cards() {
        return this._cards;
    }

    set cards(newCards) {
        throw 'Alert: the properties of this object shoudln\'t be modified manually.'
    }

    score() {
        let score = this.cards.reduce((acc, x) => acc + x.value, 0);
        
        for (const ace of this.cards.filter(card => card.name === 'A')) {
            if (score > 21) score -= 10;
            else break;
        }
        
        return score;
    }

    hit() {
        this.cards.push(deck.deal());
    }
}

// Functions

// Initialize game
function initGame() {
    // We are going to start a new game. First, the content of the body is going to be deleted
    $("body").html('');
    
    // After that, we are going to set the display for the game
    setDisplay()

    // Lastly, we will run the function that corresponds to one game of blackjack
    game()
}


// Set the playing board and buttons for the users
function setDisplay() {
    // Initialize the board and the interactive quadrant
    const board = $('<div id="board">');
    const quad = $('<div id="quad">');

    // Board elements
    const scoreBoard = $('<div id="scoreboard">');
    const scoreStr = `You <strong>${scoreHistoric[0]} - ${scoreHistoric[1]}</strong> Dealer`;
    scoreBoard.html(scoreStr);

    const dealerPic = $('<div id="dealer-pic">');
    const dealerImg = $('<img id="dealer-img" src="img/dealer.png">');
    dealerImg.appendTo(dealerPic);

    const dealerArea = $('<div class="area" id="dealer-area">');
    const playerArea = $('<div class="area" id="player-area">');

    board.append(scoreBoard);
    board.append(dealerPic);
    board.append(dealerArea);
    board.append(playerArea);

    // Quad elements
    const hitButton = $('<div class="button" id="hit">hit</div>');
    const deck = $('<div class="back card" id="deck"></div>');
    const standButton = $('<div id="stand" class="stand">stand</div>');
    const scoreHand = $('<div id="score-player">');

    quad.append(hitButton);
    quad.append(deck);
    quad.append(standButton);
    quad.append(scoreHand);

    // Append both elements to the body
    $('body').append(board);
    $('body').append(quad);

}

// Returns the html representation of a card
function createCard(card) {
    const newCard = $('<div class="card">');
    newCard.append($('<div class="card-val">' + card.name + '</div>'))
    let suit;

    switch(card.suit) {
        case 'S':
            suit = '♠︎';
            break;
        case 'H':
            suit = '♥︎';
            break;
        case 'C':
            suit = '♣︎';
            break;
        case 'D':
            suit = '♦︎';
            break;
    }
        
    const suitElem = $('<div class="card-suit">' + suit + '</div>');
    if (['S', 'C'].includes(card.suit)) suitElem.css('color', 'black');
    else suitElem.css('color', 'red');
        
    newCard.append(suitElem);
    return newCard;
}

// Update the UI according to the hand of the user
function updateHand(hand, user) {
    const userSelector = `#${user}-area`;
    $(userSelector).html("");
    for (card of hand.cards) {
        $(userSelector).append(createCard(card));
    }
}

// Given the current state of a hand, check if the user has already won or lost
function checkScore(hand, user) {
    if (user === 'player') {
        if (hand.score() > 21) outputResult('busted');
        if (hand.score() === 21) outputResult('win');
    }
    else if (user === 'dealer') {
        if (hand.score() > 21) { 
            updateHand(hand, user);
            outputResult('win'); 
        }
        if (hand.score() === 21) {
            updateHand(hand, user);
            // If the dealer's hand is being checked, the hand of the other player could have not possibly score 21, which is the best possible score; hence, he loses the game.
            outputResult('loss');
        }
    }
}

// Show the final result on the browser
function outputResult(result) {
    $('#scoreboard').html('');
    const playAgainNode = $('<div class="button" id="replay">Play again?</div>');
    playAgainNode.on('click', initGame);
    let resultNode;
    
    switch(result) {
        case 'win':
            resultNode = $('<strong>You won! </strong>');
            scoreHistoric[0]++;
            break;
        case 'push':
            resultNode = $('<strong>Pushed! </strong>'); 
            break;
        case 'loss':
            resultNode = $('<strong>You lost! </strong>');
            scoreHistoric[1]++;
            break;
        case 'busted':
            resultNode = $('<strong>Busted! </strong>');
            scoreHistoric[1]++;
            break;
    }
    
    $('#scoreboard').append(resultNode);
    $('#scoreboard').append(playAgainNode);
    $('#hit').remove();
    $('#stand').remove();
}

function game() {
    deck = new Deck();
    deck.shuffle(3);
    const dealerHand = new Hand();
    const playerHand = new Hand();


    // Initially hide the cards of the dealer
    $('#dealer-area').html("");
    for (card of dealerHand.cards) {
        const newCard = $('<div class="card back">');
        $('#dealer-area').append(newCard)
    }


    // Display the player's hand and its score
    updateHand(playerHand, 'player');
    $('#score-player').text(playerHand.score());
    checkScore(playerHand, 'player');
    

    // Define stand function
    function stand() {
        // Disable buttons
        $('#hit').remove();
        $('#stand').remove();

        // Make dealer play
        
        // The dealer will be risk averse, meaning a hand as good as the player's will be good enough
        while (dealerHand.score() < playerHand.score()) {
            // The dealer gets a new card
            dealerHand.hit()
        }

        // We will now output the result of the game
        
        if (dealerHand.score() > 21) outputResult('win');
        else if (dealerHand.score() > playerHand.score()) outputResult('loss');
        else if (dealerHand.score() === playerHand.score()) outputResult('push');
        else outputResult('win');

        // Update dealer's hand on browser
        
        updateHand(dealerHand, 'dealer');
        const scoreDealer = $('<div id="score-dealer">');
        $('#quad').append(scoreDealer);
        $('#score-dealer').text(dealerHand.score());
    }

    // Bind function to the element if necessary conditions are met
    if (playerHand.score() >= 16 && !jQuery._data($('#stand')[0], 'events')) {
        $('#stand').on('click', stand);
        $('#stand').toggleClass('button');
        $('#stand').toggleClass('stand');
    };


    // Define hit function
    function setHitButton() {
        // Get a new card from the deck
        playerHand.hit();

        // Update the score box
        $('#score-player').text(playerHand.score());

        // Update your hand in the browser
        updateHand(playerHand, 'player');
        checkScore(playerHand, 'player');

        // Check if your hand has a value of 16 at least. If so, set the stand button to its correspondent function
        if (playerHand.score() >= 16 && !jQuery._data($('#stand')[0], 'events')) {
            $('#stand').on('click', stand);
            $('#stand').toggleClass('button');
            $('#stand').toggleClass('stand');
        };
    }
    
    // Bind function to the element
    $('#hit').on('click', setHitButton);

}

// Main page

// Rules are initially hidden

$("ul").hide()

// Clicking on "rules" will unfold the list of rules of the game

$("#rules-button").on('click', function() {
    $("ul").slideToggle("slow");
})

// Clicking on play...

$("#play-button").on('click', initGame)
