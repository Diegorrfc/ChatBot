
module.exports = function (event) {

	// função que vai tratar a mensagem
	var senderID = event.sender.id;//quem está enviando
	var recipientID = event.recipient.id;//qual pagina?
	var timeOfMessege = event.timestamp;//quando foi enviada?
	var message = event.message;//qual a mensagem?

	console.log("mensagem Recebida", senderID, recipientID);

	var messageID = message.mid;
	var messageText = message.text;
	var attachnents = message.attachnents;

	if (messageText) {

		if (_estados[senderID]) {// se houver algo no estado

			switch (_estados[senderID]) {// usando os estados

				case 'options-menu'://uma pessoa que já selecionou oq deseja fazer e já digitou o numero


					if (messageText == "nao" || messageText == "Não" || messageText == "NÃO") { // se digitar a palavra não

						sendTextMessage(senderID, "Obrigado por entrar em contato conosco :)! Caso precise, estaremos sempre disponiveis para você. tenha um ótimo dia!");

					}

					else if (messageText == "sim" || messageText == "SIM") {// se digitar a palavra sim
						sendFirstMenu(senderID);//manda o menu inicial
						_estados[senderID] = "";//deixa o estados vazio
					}

					else {
						// se não for sim ou não ele retorna que não entendeu e pede para tentar novamente
						sendTextMessage(senderID, "Desculpe, eu não entendi :(. Por favor, digite umas palasvras: sim ou não");
					}
					break;

				case 'calculo-cpf'://se o estado for para cpf

					_estados[event.sender.id] = "calculo-cpf";
					sendTextMessage(senderID, validaCPF(messageText));//chama a função que valida o cpf junto para a pessoa que questa requisitando, senderID
					//showOptionsMenu(senderID)
					sendSimOuNao(senderID);// manda para a pessoa se quer mais algo ou não
					break;

				case 'calculo-cnpj':// se for cnpj

					_estados[event.sender.id] = "calculo-cnpj";
					sendTextMessage(senderID, validaCNPJ(senderID, messageText));
					//showOptionsMenu(senderID);
					sendSimOuNao(senderID)

					break;

			}

		} else {//acabou de iniciar a conversa e se não hover nada no estado

			switch (messageText) {// eu tava usando mais coisa aqui, mas eu tirei e comentei ai não quis mudar para um if ou algo parecido.

				//case 'oi':
				// sendTextMessage(senderID, 'Olá! Eu preciso que você clique em uma das opções listadas');
				//sendFirstMenu(senderID);
				// break;

				default:
					sendTextMessage(senderID, 'oi! Eu preciso que você clique em uma das opções listadas');
					sendFirstMenu(senderID);

			}

		}

	} else if (attachnents) {// caso fosse algum arqui teria um outro tratamento, mas n implementei
		console.log("Anexo?????");

	}
}

