'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');
const {MORPHEUS_URLS} = require('./morpheus-urls')
const {NEO_URLS} = require('./neo-urls')

const { AGENT_SMITH_URL } = require("./agent-smith");
const { getRandomUrl } = require('./helpers');
const { TRINITY_URLS } = require('./trinity-urls');

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
    const exists = Object.keys(CHARACTER_NAMES)
        .some(key => CHARACTER_NAMES[key] === name)
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

    [intentNames.WHICH_PILL]() {
        this.ask('Which pill will you take? The blue pill or the red pill?', 'Tell me if you are going to take the red pill or the blue pill')
    },

    [intentNames.WHICH_PILL_RESPONSE](color) {
        switch (color.value) {
            case PILLS.RED: {
                this.ask("Welcome to the Matrix. Which character would you like to meet?");
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
        if (!isValidName(character.value)) {
            this.tell('I\'m not sure what character you selected.');
        }
        const urls = CHARACTERS_URLS_MAP[character.value]
        const randomAudioUrl = getRandomUrl(urls)
        this.speechBuilder().addAudio(randomAudioUrl)
        let speech = this.speechBuilder()
                .addAudio(randomAudioUrl)
                .addBreak('300ms')
                .addText('Who else would you like to hear from?')
        this.ask(speech);
    }
});

module.exports.app = app;
