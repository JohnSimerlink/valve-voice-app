'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');
import {MORPHEUS_URLS} from './morpheus-urls'
import {NEO_URLS} from './neo-urls'

import { AGENT_SMITH_URL } from "./agent-smith";
import { getRandomUrl } from './helpers';
import { TRINITY_URLS } from './trinity-urls';

const config = {
    logging: true,
};

const app = new App(config);

const AGENT_SMITH_URL = [
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/A+man+who+calls+himself+Morpheus.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/Billions+of+people+living+up+their+lives.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/Goodbye.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/Have+you+ever+stood+and+stared.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/Human+beings+are+a+disease.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/Human+defines+their+reality+through+misery.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/I+hate+this+place.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/I+must+get+free.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/I+must+get+out+of+here.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/I+think+we+can+handle+one+little+girl.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/Look+out+that+window.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/Marvel+and+its+beauty+its+genius.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/Matrix+designed+to+be+perfect.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/Mr.+Anderson.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/Never+send+a+human+to+do+a+machines+job.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/No+one+would+accept+the+program.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/Smith++Agent+Smith.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/Some+believed+we+lacked+the+language.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/Sound+of+inevitability.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/The+future+is+our+world.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/There+was+a+disaster.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/This+zoo+this+prison+this+reality+whatever.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/What+good+is+a+phone+call.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/You+had+your+time.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/Youre+going+to+help+us.mp3",
  "https://s3.amazonaws.com/matrix-sounds/AgentSmith/Youve+been+contacted+by+a+certain+individual.mp3"
];


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
const CHARACTER_NAMES = {
    SMITH: 'smith',
    CYPHER: 'cypher',
    MORPHEUS: 'morpheus',
    NEO: 'neo',
    TRINITY: 'trinity'
}
const CHARACTERS_URLS_MAP = {
    [CHARACTER_NAMES.SMITH]: AGENT_SMITH_URL,
    [CHARACTER_NAMES.CYPHER]: [],
    [CHARACTER_NAMES.MORPHEUS]: MORPHEUS_URLS,
    [CHARACTER_NAMES.NEO]: NEO_URLS,
    [CHARACTER_NAMES.TRINITY]: TRINITY_URLS,
};
function isValidName(name) {
    const exists = Object.keys(CHARACTERS)
        .some(key => key.name === name)
    return exists
}
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
        if (!isValidName) {
            this.tell('I\'m not sure what character you selected.');
            return
        }
        const urls = CHARACTERS_URLS_MAP[character.value]
        const randomAudioUrl = getRandomUrl(url)
        this.speechBuilder().addAudio(randomAudioUrl)
    }
});

module.exports.app = app;
