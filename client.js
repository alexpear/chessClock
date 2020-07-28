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
                    name: 'Wild'
                    // Wild forest creatures
                },
                horror: {
                    name: 'Pride'
                    // Sphynxes, Griffins
                },
                scifi: {
                    name: 'Lair'
                    // Dragons
                }
            },
            horror: {
                fantasy: {
                    name: 'Tomb'
                    // Undead
                },
                horror: {
                    name: 'Damned'
                    // Hell
                },
                scifi: {
                    name: 'Void'
                    // Eldritch horrors
                }
            },
            scifi: {
                fantasy: {
                    name: 'End'
                    // Time travelers from future
                },
                horror: {
                    name: 'Space'
                    // Classic aliens
                },
                scifi: {
                    name: 'Code'
                    // Robots
                }
            }
        };

        return info[this.primaryGenre][this.secondaryGenre].name;
    }

    modifiers () {
        const forFaction = {
            myth: ['pooka', 'gorgon', 'sphynx'],

        };

        return forFaction[this.name().toLowerCase()];
    }
};

module.exports = Client;
