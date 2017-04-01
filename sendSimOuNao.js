module.exports = function (recipientId) {


  setTimeout(function () {
    _estados[recipientId] = "options-menu";


    var messageData = {

      recipient: {
        id: recipientId

      },

      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "button",
            text: "Você Precisa de mais alguma coisa?",
            buttons: [

              {
                type: 'postback',
                title: 'Sim!',// botao sim
                payload: 'opcao_Sim'
              },

              {
                type: 'postback',
                title: 'Não!',// botao não
                payload: 'Opcao_Nao',
              },

            ]
          }
        }
      }
    };

    callSendAPI(messageData);

  }, 2500);// eu coloquei um time, pois essa mensagem estava aparecendo muito rápido. Teria que melhorar a chamada desse metodo

}



