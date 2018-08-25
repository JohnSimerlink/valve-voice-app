'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');
import {MORPHEUS_URLS} from './morpheus-urls'
import { AGENT_SMITH_URL } from "./agent-smith-url";
import { CYPHER_URL } from "./cypher-url";

const config = {
    logging: true,
};

const app = new App(config);



// =================================================================================
// App Logic
// =================================================================================

const intentNames = {
    WHICH_PILL: 'WhichPill',
    WHICH_PILL_RESPONSE: "WhichPillResponse",
}
const PILLS = {
    BLUE: 'blue',
    RED: 'red',
}
const CHARACTER_NAMES = {
    NEO: 'neo',
    MORPHEUS: 'morpheus',
    THE_ORACLE: 'the oracle',
    ORACLE: 'oracle',
}
app.setHandler({
    'LAUNCH': function() {
        this.toIntent('HelloWorldIntent');
    },

    'HelloWorldIntent': function() {
        this.ask('Hello World! What\'s your name?', 'Please tell me your name.');
    },

    'HelpIntent': function() {
        this.ask('Hello World! What\'s your name?', 'Please tell me your name.');
    },


    'MyNameIsIntent': function( name ) {
        this.tell('Hey ' + name.value + ', nice to meet you!');
    },
});

module.exports.app = app;
