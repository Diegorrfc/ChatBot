
module.exports = function (recipientId, messageText) {

	//conversa entre ususario e page
	var messagedata = {
		recipient: {
			id: recipientId
		},

		message: {
			text: messageText
		}
	};

	callSendAPI(messagedata);


};
