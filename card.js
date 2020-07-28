// Central class representing game at a instant in time

const Client = require('./client.js');
const Clock = require('./clock.js');
const Location = require('./location.js');
const Player = require('./player.js');
const Util = require('./util.js');

const _ = require('lodash');

class Card {
    constructor (client, purpose, cardType, stage) {
        this.client = client;
        this.purpose = purpose;
        this.secondaryPurpose = undefined;
        this.cardType = cardType;
        this.stage = stage;

        this.debut = undefined;
        this.duration = undefined;
        this.finale = undefined;

        this.contractLength = 0;

        this.image = undefined;
        this.size = 1; // In board squares.

        // Later be more specific.
        this.location = new Location();

        // TODO randomness
        this.fillInBlanks();
    }

    fillInBlanks () {
        this.fillPurpose();
        this.fillSecondaryPurpose();
        this.fillType();
        this.fillStage();
        this.fillDebut();
        this.fillDuration();
        this.fillFinale();
        this.fillContractLength();

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

    fillStage () {
        this.stage = this.stage || _.sample([1, 2, 3]);
    }

    fillDebut () {
        this.debut = this.debut || _.sample(Card.debuts());
    }

    fillDuration () {
        this.duration = this.duration || _.sample(Card.durations());
    }

    fillFinale () {
        this.finale = this.finale || _.sample(Card.finales());
    }

    fillContractLength () {
        this.contractLength = this.contractLength ||
            Math.ceil(Math.random() * 999);
    }

    // returns a string like 'Bookstore'
    getDescriptor () {
        const chart = {
            cultural: {
                cultural: {
                    // Aesthetics
                    occupation: ['designer', 'artist', 'visionary'],
                    structure: ['installation', 'gallery', 'museum'],
                    initiative: ['collective', 'art scene', 'art movement']
                },
                economic: {
                    // Performance
                    occupation: ['performer', 'actor', 'virtuoso'],
                    structure: ['venue', 'theater', 'arena'],
                    initiative: ['concert', 'tour', 'festival']
                },
                legacy: {
                    // LATER System should be able to see this is the Language section
                    // Language
                    occupation: ['blogger', 'author', 'wordsmith'],
                    structure: ['bookstore', 'library', 'university'],
                    initiative: ['guest lecture', 'bestseller', 'great american novel']
                }
            },
            economic: {
                cultural: {
                    // Mass Media
                    occupation: ['assistant', 'producer', 'mogul'],
                    structure: ['agency', 'studio', 'media network'],
                    initiative: ['local news', 'sitcom', 'award show']
                },
                economic: {
                    // Service
                    occupation: ['waiter', 'manager', 'CEO'],
                    structure: ['food truck', 'restaurant', 'franchise'],
                    initiative: ['local ad', 'endorsement', 'sponsorship']
                },
                legacy: {
                    // Tech
                    occupation: ['intern', 'innovator', 'pioneer'],
                    structure: ['startup', 'office', 'corporation'],
                    initiative: ['app', 'gadget', 'breakthrough']
                }
            },
            legacy: {
                cultural: {
                    // Progress
                    occupation: ['canvasser', 'activist', 'hero'],
                    structure: ['soup kitchen', 'free clinic', 'foundation'],
                    initiative: ['petition', 'boycott', 'manifesto']
                },
                economic: {
                    // Fame
                    occupation: ['influencer', 'celebrity', 'icon'],
                    structure: ['novelty attraction', 'landmark', 'destination'],
                    initiative: ['tabloid headline', 'talk show appearance', 'black tie gala']
                },
                legacy: {
                    // Government
                    occupation: ['coordinator', 'politician', 'leader'],
                    structure: ['public garden', 'athletic field', 'national park'],
                    initiative: ['PSA', 'political campaign', 'holiday']
                }
            }
        };

        return chart[this.purpose][this.secondaryPurpose][this.cardType][this.stage - 1];
    }

    toString () { 
        const border = '-------------------------------';

        const client = Util.capitalized(this.client);
        const descriptor = Util.capitalized(this.getDescriptor());

        // LATER combine type, purpose, and stage into one word from the relevant chart. Stage 2 cultural structure = Bookstore.
        // const descriptor = this.getDescriptor();

        // TODO also save what species this is (if applicable).

        const lines = [
            border,
            ` ($${this.cost()}) ${descriptor} of the ${client}`,
            ` (${this.purpose}/${this.secondaryPurpose} ${this.cardType})`,
            ` Stage ${this.stage}`,
            ` Debut: ${this.debut}`,
            ` Duration: ${this.duration}`,
            ` Contract Length: ${this.contractLength}s`,
            ` Finale: ${this.finale}`,
            border
        ];

        return lines.join('\n');
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

    static debuts () {
        return [
            'we gain $10',
            'they lose $10',
            'we must remove 1 of our cards',
            'we may move 1 of our cards on the board'
        ];
    }

    static durations () {
        return [
            'we gain $1',
            'they lose $1',
            'their cards cost $1 more',
            'our cards cost $1 less'
        ];
    }

    static finales () {
        return [
            'we gain $10',
            'they lose $10',
            'we must remove 1 of our cards',
            'we may move 1 of our cards on the board'
        ];
    }

    cost () {
        return Math.ceil( Math.random() * 100 );
    }

    static test () {
        const clientName = new Client().name() || 'lair';

        const example = new Card(clientName);
        example.print();
    }
}

module.exports = Card;

Card.test();



