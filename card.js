// Central class representing game at a instant in time

const Client = require('./client.js');
const Clock = require('./clock.js');
const Player = require('./player.js');

const _ = require('lodash');

class Card {
    constructor (client, purpose, cardType, level) {
        this.client = client;
        this.purpose = purpose;
        this.secondaryPurpose = undefined;
        this.cardType = cardType;
        this.level = level;

        this.debut = undefined;
        this.duration = undefined;
        this.finale = undefined;

        this.contractLength = 0;

        this.image = undefined;
        this.size = 1; // In board squares.

        // TODO randomness
        this.fillInBlanks();
    }

    fillInBlanks () {
        this.fillPurpose();
        this.fillSecondaryPurpose();
        this.fillType();
        this.fillLevel();
        // this.fillDebut();
        // this.fillDuration();
        // this.fillFinale();
        // this.fillContractLength();

        // LATER randomly generated name
    }

    fillType () {
        this.cardType = this.cardType || _.sample(Object.keys(Card.types()));
    }

    fillPurpose () {
        this.purpose = this.purpose || _.sample(Object.keys(Card.purposes()));
    }

    fillSecondaryPurpose () {
        this.secondaryPurpose = this.secondaryPurpose || _.sample(Object.keys(Card.purposes()));
    }

    fillLevel () {
        this.level = this.level || _.sample([1, 2, 3]);
    }

    // returns a string like 'Bookstore'
    getDescriptor () {
        const chart = {
            cultural: {
                cultural: {
                    occupation: [],
                    structure: [],
                    initiative: []
                },
                economic: {
                    occupation: [],
                    structure: [],
                    initiative: []
                },
                legacy: {
                    // LATER System should be able to see this is the Language section
                    // Language
                    occupation: ['blogger', 'author', 'wordsmith'],
                    structure: [],
                    initiative: []
                }
            },
            economic: {
                cultural: {
                    occupation: [],
                    structure: [],
                    initiative: []
                },
                economic: {
                    occupation: [],
                    structure: [],
                    initiative: []
                },
                legacy: {
                    occupation: [],
                    structure: [],
                    initiative: []
                }
            },
            legacy: {
                cultural: {
                    occupation: [],
                    structure: [],
                    initiative: []
                },
                economic: {
                    occupation: [],
                    structure: [],
                    initiative: []
                },
                legacy: {
                    occupation: [],
                    structure: [],
                    initiative: []
                }
            }
        };

        return chart[this.purpose][this.cardType][this.level - 1];
    }

    toString () { 
        const border = '-------------------------------';

        const client = this.client.toUpperCase();

        // LATER combine type, purpose, and level into one word from the relevant chart. Level 2 cultural structure = Bookstore.
        // const descriptor = this.getDescriptor();

        // TODO also save what species this is (if applicable).

        const output = `${border}\n ($${this.cost()}) ${client} ${this.purpose} ${this.cardType} card\n Level ${this.level}\n Debut: ${this.debut}\n Duration: ${this.duration}\n Finale: ${this.finale}\n${border}`;

        return output;
    }

    print () {
        console.log(this.toString());
    }

    static types () {
        return {
            occupation: 'occupation',
            structure: 'structure',
            initiative: 'initiative'
        };
    }

    static purposes () {
        return {
            cultural: 'cultural',
            economic: 'economic',
            legacy: 'legacy' // Charity, government, science, fame, tourism
        };
    }

    cost () {
        return 0;
    }

    // fillLevel() {}



    static test () {
        const example = new Card('lair');
        example.print();
    }
}

module.exports = Card;

Card.test();



