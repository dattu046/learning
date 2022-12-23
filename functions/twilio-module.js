const { MessageError } = require("./error.js");
const twilio = require('twilio');
const { defineString } = require('firebase-functions/params');

const twilioClient = new twilio(twilioSID, twilioToken);


function sendMessage(message){
    return twilioClient.messages
        .create(
            {
                body: `${message}`,
                to: '+918639255418',
                from: '+16692218463'
            }
        ).then((message) => {
            return {messageId: message.sid};
        }
        ).catch((error) => {
            throw new MessageError(error.message);
        })
}

exports.sendMessage = sendMessage;