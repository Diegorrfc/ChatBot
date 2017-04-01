var CNPJ = require("cpf_cnpj").CNPJ;// validar cnpj
module.exports = function (sender, cnpj) {// validação do cnpj

    var cnpjSemPontos = CNPJ.strip(cnpj);
    var cnpjAuxiliar = CNPJ.format(cnpj);


    var request = require("request")//UTILIZANDO JSON PARA CAPTURAR OS DADOS
    var url = "https://www.receitaws.com.br/v1/cnpj/" + cnpj;// site da culta do cnpj mais o cnpj sem os pontos
    var dados;
    request({
        url: url,
        json: true
    }, function (error, response, body) {


        if (!error && response.statusCode === 200) {

            if (body.nome == undefined) {//se o nome for indefinido quer dizer que n encontrou o cnpj

                sendTextMessage(sender, "O CNPJ é inválido")// retorna cnpj invalido
            }
            else {// se encontro o nome retorna o valores abaixo
                sendTextMessage(sender, "O CNPJ é válido\n");
                sendTextMessage(sender, "\nNOME DA EMPRESA: " + body.nome + "\nATIVIDADE PRINCIPAL: " + body.atividade_principal[0].text + "\nSITUAÇÃO DA EMPRESA:\n " + body.situacao + "\nCNPJ DA EMPRESA: " + body.cnpj);


            }

        }
    })

}