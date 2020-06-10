import { Game } from './entities/round.js';
import { Deck } from './entities/deck.js';
import { ScoreBoard } from './entities/scoreBoard.js';

$("ul").hide();

$("#rules-button").on('click', function() {
    $("ul").slideToggle("slow");
})

$("#play-button").on('click', function() {
    const game = new Game(new Deck(), new ScoreBoard());
    game.play();
})