// Analogous to a deck

const Card = require('./card.js');

class CardGenerator {
    constructor (faction, info) {
        this.faction = faction;

        // NOTE: This is a shallow copy but that should be fine. 
        this.info = info;

        this.upcomingCards = [];
    }

    randomCard () {
        if (this.upcomingCards.length > 0) {
            // BTW: shift() removes and returns the 0th element.
            const topCard = upcomingCards.shift();

            return topCard;
        }

        // TODO make this faction-specific later.
        return new Card();
    }

    // returns CardGenerator 
    static fromFile (fileName) {
        // Later read info from file.
        const info = undefined;

        return new CardGenerator(undefined, info);
    }

}

module.exports = CardGenerator;
