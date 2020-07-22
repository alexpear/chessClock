// Represents a player and their current state (how much money they have, etc).

const CardGenerator = require('./cardGenerator.js');
const Client = require('./client.js')

class Player {
    constructor (name, client, generatorInfo) {
        this.name = name;
        this.client = client;
        this.money = 0;
        this.secondsLeft = 600;

        this.cardGenerator = new CardGenerator(faction, generatorInfo);
    }

    example () {
        return new Player(
            'Audrey Hepburn',
            new Client('horror', 'scifi')
        );
    }


}

module.exports = Player;
