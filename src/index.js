var Alexa = require('alexa-sdk');
var dialogue = require('./helpers/getDialogue');
var moment = require('moment');

exports.handler = function(event, context, callback) {
	var alexa = Alexa.handler(event, context);
	alexa.appId = 'amzn1.ask.skill.dadf8b3b-d059-4bb3-ac70-7461b92099c8'; // Coffee Now (Development)
	alexa.registerHandlers(handlers);
	alexa.execute();
};

var handlers = {
		'LaunchRequest' : function () {
				//Define Speech Outputs
				console.log("LaunchIntent");
				var speechOutput = dialogue.pickPhrase(dialogue.phrases.welcome.prompt);
				var repromptText = dialogue.pickPhrase(dialogue.phrases.welcome.reprompt);
				//Send the ask response.
				this.emit(':ask', speechOutput, repromptText);
		},
		// Triggers when the user try to get the help message.
		'AMAZON.HelpIntent' : function () {
				console.log("Into helpIntent");
				//Define Speech Outputs
				this.emit(':ask',dialogue.pickPhrase(dialogue.phrases.help.generic),dialogue.pickPhrase(dialogue.phrases.help.generic));
		},
		'AMAZON.StopIntent' : function () {
				console.log("Into stop intent");
				//Define Speech Outputs
				this.emit(':tell',dialogue.pickPhrase(dialogue.phrases.generic.stop),dialogue.pickPhrase(dialogue.phrases.generic.stop));
		},
		'AMAZON.CancelIntent' : function () {
				console.log("Into cancel intent");
				//Define Speech Outputs
				this.emit('AMAZON.StopIntent');
		},
		'AMAZON.YesIntent' : function () {
				console.log("Into Yes Intent");
				var timein8 = moment().utcOffset(60).add('minutes',8).format('LT')
				var speechOutput = "Great! That has been ordered and we'll see you at " + timein8;
				console.log(speechOutput)
				this.emit(':tell', speechOutput);
		},
		'AMAZON.NoIntent' : function () {
				console.log("Into No Intent");
				this.emit(':tell', dialogue.pickPhrase(dialogue.phrases.generic.stop));
				
			},
		// Triggers when the user wants to get the status of a line
		'orderCoffeeIntent' : function () {
				var intentSlots = this.event.request.intent.slots
				console.log(intentSlots)
				var type = intentSlots['type'].value
				var size = intentSlots['size'].value
				this.attributes.size = size
				this.attributes.type = type
				console.log("Into orderIntent");
				var speechOutput = "Sure! I can get you a " + size + " " + type + ".  That'll be two pounds and ten pence and ready in 8 minutes. Would you like to order now?"
				var repromptText = "Say Yes to confirm your order or no to cancel.";

				//Send the ask response.
				this.emit(':ask', speechOutput, repromptText);
		},
		'beerIntent' : function () {
				console.log("Into beer Intent");
				var speechOutput = "Come on David, it's a bit early!";
				this.emit(':tell', speechOutput );
		},
		// Triggers when the user says something other than the above intents.
		'Unhandled': function() {
			console.log("UNHANDLED");
				this.emit(':ask',dialogue.pickPhrase(dialogue.phrases.unhandled.prompt),dialogue.pickPhrase(dialogue.phrases.unhandled.prompt));
		}
};

