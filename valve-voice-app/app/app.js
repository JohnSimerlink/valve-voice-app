'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');
import {MORPHEUS_URLS} from './morpheus-urls'

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
        this.toIntent(intentNames.WHICH_PILL);
    },

    'HelloWorldIntent': function() {
        this.ask('Hello World! What\'s your name?', 'Please tell me your name.');
    },
    [intentNames.WHICH_PILL]() {
        this.ask('Which pill you take? The blue pill or the red pill?', 'Tell me if you are going to take the red pill or the blue pill')
    },
    [intentNames.WHICH_PILL_RESPONSE](color) {
        switch (color.value) {
            case PILLS.RED: {
                this.tell("you stay in Wonderland and I show you how deep the rabbit-hole goes")
                break
            }
            case PILLS.BLUE: {
                this.tell("The story has ended. You will wake up in your bed and believe whatever you want to believe")
                break
            }
            default:
            {
                
                this.tell(`I\m not really sure what pill you took. You chose ${color} `)
                break
            }
        }
    }
});

module.exports.app = app;
