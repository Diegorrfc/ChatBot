module.exports = function (recipientId) {// metodo para mostra o munu do sim e não, mas eu substitui pelos botões do sim ou não.

    setTimeout(function () {// contabilizar o tempo para ser mostrado o menu
        sendTextMessage(recipientId, "Você Precisa de mais alguma coisa?");
        _estados[recipientId] = "options-menu";
    }, 2500);

}