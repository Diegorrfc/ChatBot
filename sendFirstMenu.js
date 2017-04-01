module.exports = function (recipientId) {

	//metodo para enviar o menunu iinical dos botões

	var messageData = {

		recipient: {
			id: recipientId

		},

		message: {
			attachment: {
				type: "template",
				payload: {
					template_type: "button",
					text: "Escolha uma das opções disponiveis logo abaixo:",
					buttons: [

						{
							type: 'postback',
							title: 'Validar CPF',// botao validar cpf
							payload: 'validar_cpf'
						},

						{
							type: 'postback',
							title: 'validar CNPJ',//batao validar cnpj
							payload: 'validar_cnpj',
						},

						{
							type: 'postback',
							title: 'Sair',// botão para sair
							payload: 'clicou_sair'
						}

					]
				}
			}
		}
	};
	callSendAPI(messageData);

}
