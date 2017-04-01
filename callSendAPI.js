

module.exports = function (messageData) {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: 'EAACAz1uUTnkBACFwPt89pnS4lOFZCXFlfLCp75kVtshj3FV2mwtZCpyuppFHLfHHui8cpv30uWMijdNMA9AZB0IUrteDrIW1RYVD5zWaPWgsBYx1sn59fMuY8VERnqGX9zu53Bfwai5PfenHJZBiu2mG7u6eHYkxYqrqC3WNeQz2CZAl3ZCZBzT' },
        method: 'POST',
        json: messageData
    }, function (error, response, body) {

        if (!error && response.statusCode == 200) {
            console.log("menssagem enviada");
            var recipientID = body.recipient_id;
            var messageID = body.message_id;

        } else {
            console.log("não - enviada");//botei para fazer 
            console.log(error);
        }
    })
}