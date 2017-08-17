var expect = require('chai').expect;
var index = require('../src/index');
var dialogue = require('../src/helpers/getDialogue');

const context = require('aws-lambda-mock-context');
const ctx = context();

describe("Testing an Intent request for orderCoffeeIntent - SMALL CAPPUCCINO", function() {
	var speechResponse = null
	var speechError = null

	before(function(done) {
		index.handler({
  "session": {
    "sessionId": "SessionId.4dd4aa2f-7e97-4bad-8bc0-f38714fe891e",
    "application": {
      "applicationId": "amzn1.ask.skill.dadf8b3b-d059-4bb3-ac70-7461b92099c8"
    },
    "attributes": {},
    "user": {
      "userId": "amzn1.ask.account.AGS2K6E2MQPOPRLEVD7C6ROY5L7CTQKTPZSW7APWERU2IQRJUYK5HGYL3GSRKWTDGHYRCOPFRQ5U7XMBLSGEITVI6AJDF6TXILNBC344S3WTNF4EPB57BDZFAFYAEOOO2DY2TLTL3EBLEONI5KOI35KRMU4IGYUSX5DZ3VPKLPGAIDEMDIXOFMYSROOAEUDA2EKKYLBH67LQTIQ"
    },
    "new": true
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "EdwRequestId.3a76b4ed-9109-4e68-a71c-abc0aa165ca9",
    "locale": "en-GB",
    "timestamp": "2017-06-17T15:28:48Z",
    "intent": {
      "name": "orderCoffeeIntent",
      "slots": {
        "size": {
          "name": "SIZE",
          "value": "small"
        },
        "type": {
          "name": "TYPE",
          "value": "cappuccino"
        }
			}
    }
  },
  "version": "1.0"
}, ctx)

		ctx.Promise
			.then(resp => {
				speechResponse = resp;
				done();
			})
			.catch(err => {
				speechError = err;
				done();
			})
	})

	beforeEach(function(){
		// runs before each test in this block
		})

	describe("The specific intent response details are correct", function() {

		console.log("Verifying session attributes");
		console.log(speechResponse);
	
		it("should contain a session attributes object including \'size\' and \'type\'", function() {
			expect(speechResponse.sessionAttributes.size).not.to.be.null
			expect(speechResponse.sessionAttributes.type).not.to.be.null
		})
	
		it("should have a session attributes object including both values \'small\' and \'cappuccino\'", function() {
			expect(speechResponse.sessionAttributes.size).to.equal('small')
			expect(speechResponse.sessionAttributes.type).to.equal('cappuccino')
		})

		it("should have a session attributes object including both values \'small\' and \'cappuccino\'", function() {
			expect(speechResponse.sessionAttributes.size).not.to.equal('larger')
			expect(speechResponse.sessionAttributes.type).not.to.equal('latte')
		})

	})

})