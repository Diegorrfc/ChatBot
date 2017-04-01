
var CPF = require("cpf_cnpj").CPF;//validar cpf
module.exports = function (cpf) {// metodo que valida esse cpf, eu não consequi buscar os dados na receita, n encontrei API gratuito para isso.

    var cpfAuxiliar = CPF.format(cpf);// converte o cpf sem os pontos
    if (CPF.isValid(cpfAuxiliar)) {//chama a função para validar cpf
        return 'O CPF:  ' + cpfAuxiliar + ', é Valido!';// retorna o cpf valido com os pontos
    } else {
        return 'o CPF ' + cpfAuxiliar + ', é Invalido!';// retorna o cpf valido com os pontos
    }

}

