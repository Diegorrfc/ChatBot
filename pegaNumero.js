module.exports = function (event) {// metodo para perguntar o numero que deseja verifica, vair servir para o cnpj e cpf
    sendTextMessage(event.sender.id, 'Por favor, digite o numero que você deseja verificar');
    return event.message;// retorna o numero
}
