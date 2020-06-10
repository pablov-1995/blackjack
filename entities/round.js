import { Deck } from './deck.js';
import { PlayerHand, DealerHand } from './hand.js';
import { UserInterface } from './userInterface.js';

class Round {
    constructor(deck, score) {
        this.deck = deck;
        this.score = score;
        this.interface = new UserInterface(this.score);

        this.deck.shuffle(3);

        this.playerHand = new PlayerHand(this.deck.dealHand());
        this.dealerHand = new DealerHand(this.deck.dealHand());
    }

    play() {
        // Initialize interface
        $("body").html('');
        this.interface.build();

        // Initially hide the cards of the dealer
        $('#dealer-area').html("");
        this.dealerHand.cards.forEach(card => $('#dealer-area').append(card.createBackHTML()));

        // Display the player's hand and its score
        this.playerHand.update();
        this.playerHand.updateScore();
        this.checkPlayerScore();

        // Bind stand function to the element if necessary conditions are met
        this.bindFunctionStands();

        // Bind hit function to the element
        $('#hit').on('click', this.playerHits.bind(this));

    }
    
    checkPlayerScore() {
        if (this.playerHand.busted()) this.outputResult('busted');
        if (this.playerHand.blackjack()) this.outputResult('win');
    }

    checkDealerScore() {
        this.dealerHand.update();
        if (this.dealerHand.busted()) this.outputResult('win');
        else if (this.dealerHand.blackjack()) this.outputResult('loss');
    }

    playerHits() {
        // Get a new card from the deck
        this.playerHand.hit(this.deck.deal());

        // Update the score box
        this.playerHand.updateScore();

        // Update your hand in the browser
        this.playerHand.update();
        this.checkPlayerScore();

        // Check if your hand has a value of 16 at least. If so, set the stand button to its correspondent function
        this.bindFunctionStands();
    }
    
    playerStands() {
        // Disable buttons
        $('#hit').remove();
        $('#stand').remove();

        // Make dealer play
        
        // The dealer will be risk averse, meaning a hand as good as the player's will be good enough
        while (this.dealerHand.score() < this.playerHand.score()) this.dealerHand.hit(this.deck.deal());

        // We will now output the result of the game
        
        if (this.dealerHand.busted()) this.outputResult('win');
        else if (this.dealerHand.score() > this.playerHand.score()) this.outputResult('loss');
        else if (this.dealerHand.score() === this.playerHand.score()) this.outputResult('push');
        else this.outputResult('win');

        // Update dealer's hand on browser
        
        this.dealerHand.update();
        this.dealerHand.updateScore();
    }

    bindFunctionStands() {
        // Check if score is at least 16 and no event has been binded to the button 'stand' yet
        if (this.playerHand.score() >= 16 && !jQuery._data($('#stand')[0], 'events')) {
            $('#stand').on('click', this.playerStands.bind(this));
            $('#stand').toggleClass('button');
            $('#stand').toggleClass('stand');
        };
    }

    outputResult(result) {
        // The scoreboard element is where we're going to display the final result of the round
        $('#scoreboard').html('');
        
        let resultNode;

        if (result === 'win') {
            resultNode = $('<strong>You won! </strong>');
            this.score.bumpPlayerScore();
        }
        else if (result === 'push') {
            resultNode = $('<strong>Pushed! </strong>'); 
        }
        else if (result === 'loss') {
            resultNode = $('<strong>You lost! </strong>');
            this.score.bumpDealerScore();
        }
        else if (result === 'busted') {
            resultNode = $('<strong>Busted! </strong>');
            this.score.bumpDealerScore();
        }

        const playAgainNode = $('<div class="button" id="replay">Play again?</div>');
        playAgainNode.on('click', this.play.bind(new Round(new Deck(), this.score)));
        
        $('#scoreboard').append(resultNode);
        $('#scoreboard').append(playAgainNode);
        $('#hit').remove();
        $('#stand').remove();
    }
}

export {
    Round as Game
}