// Clients are like factions. Each player has 1 faction.
/*

       Fantasy
          A
         / \
        I   B
       /     \
      H       C
     /         \
    G - F - E - D
 Scifi         Horror

*/

const _ = require('lodash');

class Client {
    constructor (primary, secondary) {
        this.primaryGenre = primary;
        this.secondaryGenre = secondary;

        this.fillBlanks();

        this.modifiers = [];
    }

    fillBlanks () {
        const genres = ['fantasy', 'scifi', 'horror'];
        this.primaryGenre = this.primaryGenre || _.sample(genres);
        this.secondaryGenre = this.secondaryGenre || _.sample(genres);
    }

    name () {
        const info = {
            fantasy: {
                fantasy: {
                    name: 'myth'
                    // Wild forest creatures
                },
                horror: {
                    name: 'lore'
                    // Sphynxes, Griffins
                },
                scifi: {
                    name: 'forge'
                    // Dragons
                }
            },
            horror: {
                fantasy: {
                    name: 'tomb'
                    // Undead
                },
                horror: {
                    name: 'sin'
                    // Hell
                },
                scifi: {
                    name: 'void'
                    // Eldritch horrors
                }
            },
            scifi: {
                fantasy: {
                    name: 'end'
                    // Time travelers from future
                },
                horror: {
                    name: 'space'
                    // Classic aliens
                },
                scifi: {
                    name: 'code'
                    // Robots
                }
            }
        };

        return info[this.primaryGenre][this.secondaryGenre].name;
    }

    // Modifiers are like species.
    getModifiers () {
        const forFaction = {
            void: ['null', 'abomination', 'ancient'],
            sin: ['imp', 'hellhound', 'demon'],
            tomb: ['skeleton', 'ghost', 'vampire'],
            lore: ['chupacabra', 'mothman', 'sasquatch'],
            myth: ['pooka', 'gorgon', 'sphynx'],
            forge: ['elemental', 'gargoyle', 'dragon'],
            end: ['dodo', 'mammoth', 'triceratops'],
            code: ['robot', 'drone', 'ai'],
            space: ['martian', 'carnivore', 'grey']
        };

        return forFaction[this.name()];
    }
};

module.exports = Client;
