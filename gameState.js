// Central class representing game at a instant in time

class Clock = require('./clock.js');
class Player = require('./player.js');

class GameState {
    constructor () {
        this.clock = new Clock();
        this.players = [
            new Player(),
            new Player()
        ];

        this.cards = [];

        this.board = [][];
    }

    // Describe the current game state in text.
    print () {

    }

    


}

module.exports = GameState;
