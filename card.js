// Central class representing game at a instant in time

const CardName = require('./cardName.js');
const Client = require('./client.js');
const Clock = require('./clock.js');
const Location = require('./location.js');
const Player = require('./player.js');
const Util = require('./util.js');

const _ = require('lodash');

class Card {
    constructor (client, purpose, cardType, stage) {
        this.client = client;

        // Later clean this constructor interface up:
        this.purpose = purpose;
        this.secondaryPurpose = undefined;

        this.cardType = cardType;
        this.stage = stage;

        // Modifier is like species
        this.modifier = undefined;

        this.debut = undefined;
        this.duration = undefined;
        this.finale = undefined;

        this.contractLength = 0;

        this.characterName = CardName.random();

        this.image = undefined;
        this.size = 1; // In board squares.

        // Later be more specific.
        this.location = new Location();

        this.fillInBlanks();
    }

    fillInBlanks () {
        this.fillPurpose();
        this.fillSecondaryPurpose();
        this.fillType();
        this.fillStage();
        this.fillModifier();
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

    fillModifier () {
        this.modifier = this.modifier || this.randomModifier();
    }

    randomModifier () {
        const options = this.client.getModifiers();
        const dieRoll = Math.random();

        if (dieRoll < 0.45) {
            return options[0];
        }
        if (dieRoll < 0.78) {
            return options[1];
        }

        return options[2];
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

        // TODO functionize header for html use
        const client = Util.capitalized(this.client.name());
        const modifier = Util.capitalized(this.modifier);
        const descriptor = Util.capitalized(this.getDescriptor());

        const header = this.cardType === 'occupation' ?
            ` ($${this.cost()}) ${this.characterName}, ${modifier} ${descriptor} (${client} Inc)` :
            ` ($${this.cost()}) <NAME>, ${modifier} ${descriptor} (${client} Inc)`;

        const lines = [
            border,
            header,
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

    static random () {
        return new Card(new Client());
    }

    static test () {
        const example = Card.random();
        example.print();
    }
}

module.exports = Card;

Card.test();



