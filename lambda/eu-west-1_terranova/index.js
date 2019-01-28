const Alexa = require('ask-sdk');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Buongiorno, posso aiutarti con i tuoi acquisti su Terranova. Vuoi conoscere le offerte o procedere con gli acquisti?';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const GetPromotionsHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GetPromotionsIntent';
    },
    handle(handlerInput) {
        const category = handlerInput.requestEnvelope.request.intent.slots.category.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        const speechText = `Ecco le promozioni per la categoria ${category}: bla bla bla. Ti interessa uno tra questi articoli?`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Promozioni di oggi', 'Le promozioni sono: bla\nbla\nbla')
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak('Mi dispiace, non ho capito. Puoi ripetere?')
            .reprompt('Mi dispiace, non ho capito. Puoi ripetere?')
            .getResponse();
    },
};

exports.handler = Alexa.SkillBuilders.standard()
    .addRequestHandlers(
        LaunchRequestHandler,
        GetPromotionsHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
