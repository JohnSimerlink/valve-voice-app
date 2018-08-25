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
    WHICH_CHARACTER: "WhichCharacter",
    WHICH_CHARACTER_RESPONSE: "WhichCharacterResponse"
};
const PILLS = {
    BLUE: 'blue',
    RED: 'red',
};
const CHARACTERS = {
    SMITH:"smith",
    CYPHER:"cypher",
    MORPHEUS:"morpheus",
    NEO:"neo",
    TRINITY:"trinity",
    ORACLE: 'oracle'
};
app.setHandler({
    'LAUNCH': function() {
        this.toIntent(intentNames.WHICH_PILL)
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
    [intentNames.WHICH_PILL_RESPONSE](color) {
        switch (color.value) {
            case PILLS.RED: {
                this.tell("Welcome to the Matrix");
                this.toIntent(intentNames.WHICH_CHARACTER);
                break
            }
            case PILLS.BLUE: {
                this.tell("The story has ended. You will wake up in your bed and believe whatever you want to believe")
                break
            }
            default:
            {
                this.tell(`I\'m not really sure what pill you took. You chose ${color} `);
                this.toIntent(intentNames.WHICH_PILL);
                break
            }
        }
    },
    [intentNames.WHICH_CHARACTER]() {
        this.ask("Who do you want to see?", "Tell me the name of the Matrix character you would like to see.")
    },
    [intentNames.WHICH_CHARACTER_RESPONSE](character){
        switch(character.value){
            case CHARACTERS.SMITH: {
                this.speechBuilder().addAudio(AGENT_SMITH_URL[Math.floor(Math.random() * AGENT_SMITH_URL.length)]);
            }
            case CHARACTERS.CYPHER: {
                this.tell("lol, noone here");
            }
            case CHARACTERS.MORPHEUS: {
                this.tell("lol, noone here");
            }
            case CHARACTERS.NEO: {
                this.tell("lol, noone here");
            }
            case CHARACTERS.TRINITY: {
                this.tell("lol, noone here");
            }
            default:
            {
                this.tell('I\'m not sure what character you selected.');
            }
        }
    }
});

module.exports.app = app;
