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

        // TODO this is weirdly buggy. Has correct value in Chrome debugger but displays old value. Consider creating the <p> elements from whole cloth in JS instead.
        const nameElement = cardDiv.querySelector('.cardName');
        nameElement.innerHtml = header;
    }
}

module.exports = Interface;

Interface.test();
