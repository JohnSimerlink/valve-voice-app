'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');

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

    'Unhandled': function() {
      let speech = this.speechBuilder()
              .addText('I didn\'t catch that.')
              .addBreak('300ms')
              .addText('Which character do you want to speak to?');
      let reprompt = this.speechBuilder()
              .addText('Which character do you want to speak to?');
      this.ask( speech , reprompt );
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

const MORPHEUS_URLS = [
    "https://s3.amazonaws.com/matrix-sounds/Morpheus/As+long+as+the+Matrix+exists....mp3",
    "https://s3.amazonaws.com/matrix-sounds/Morpheus/Body+cannot+live.mp3",
    "https://s3.amazonaws.com/matrix-sounds/Morpheus/Desert+of+the+real.mp3",
    "https://s3.amazonaws.com/matrix-sounds/Morpheus/Difference.mp3",
    "https://s3.amazonaws.com/matrix-sounds/Morpheus/Dream.mp3",
    "https://s3.amazonaws.com/matrix-sounds/Morpheus/He+is+the+one.mp3",
    "https://s3.amazonaws.com/matrix-sounds/Morpheus/Human+race+will+never+be+free.mp3",
    "https://s3.amazonaws.com/matrix-sounds/Morpheus/No+one+can+be+told....mp3",
    "https://s3.amazonaws.com/matrix-sounds/Morpheus/No+one+can+be+told.mp3",
    "https://s3.amazonaws.com/matrix-sounds/Morpheus/Offering+the+truth.mp3",
    "https://s3.amazonaws.com/matrix-sounds/Morpheus/Red+or+blue.mp3",
    "https://s3.amazonaws.com/matrix-sounds/Morpheus/The+Matrix.mp3",
    "https://s3.amazonaws.com/matrix-sounds/Morpheus/Try+to+relax.mp3",
    "https://s3.amazonaws.com/matrix-sounds/Morpheus/Welcome+to+the+real+world.mp3",
    "https://s3.amazonaws.com/matrix-sounds/Morpheus/What+is+the+Matrix.mp3",
    "https://s3.amazonaws.com/matrix-sounds/Morpheus/You+wont+have+to.mp3",
];

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

const NEO_URLS = [
    "https://s3.amazonaws.com/matrix-sounds/Neo/I+give+you+the+finger.mp3",
    "https://s3.amazonaws.com/matrix-sounds/Neo/What+is+The+Matrix.mp3",
    "https://s3.amazonaws.com/matrix-sounds/Neo/What+is+happening.mp3",
    "https://s3.amazonaws.com/matrix-sounds/Neo/You+wont+have+to.mp3",
];

const CYPHER_URL = [
  "https://s3.amazonaws.com/matrix-sounds/Cypher/Buckle+your+seatbelt.mp3",
];

const TRINITY_URLS = [
    "https://s3.amazonaws.com/matrix-sounds/Trinity/Answer.mp3",
    "https://s3.amazonaws.com/matrix-sounds/Trinity/Theyre+watching+you.mp3",
]
