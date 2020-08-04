'use strict';

// Set up with this command:
// browserify interface.js -o interfaceBundle.js

const Card = require('./card.js');
const Util = require('./util.js');

class Interface {
    constructor () {

    }

    static test () {
        const face = new Interface();

        const cardDiv = document.getElementById('exampleCard');
        const card = Card.random();

        const client = Util.capitalized(card.client.name());
        const modifier = Util.capitalized(card.modifier);
        const descriptor = Util.capitalized(card.getDescriptor());

        const header = card.cardType === 'occupation' ?
            ` ($${card.cost()}) ${card.characterName}, ${modifier} ${descriptor} (${client} Inc)` :
            ` ($${card.cost()}) <NAME>, ${modifier} ${descriptor} (${client} Inc)`;

        addRow(header, 'cardName');
        addRow(`(${card.purpose}/${card.secondaryPurpose} ${card.cardType})`, 'cardCategory');
        addRow(`Stage ${card.stage}`);
        addRow(`Debut: ${card.debut}`);
        addRow(`Duration: ${card.duration}`);
        addRow(`Contract Length: ${card.contractLength}`);
        addRow(`Finale: ${card.finale}`);

        function addRow (text, className) {
            const newRow = document.createElement('p');
            newRow.innerText = text;

            if (className) {
                newRow.classList.add('className');
            }

            cardDiv.appendChild(newRow);

            return newRow;
        }
    }

}

module.exports = Interface;

Interface.test();
