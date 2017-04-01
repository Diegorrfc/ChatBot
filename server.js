//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.

//
var http = require('http');
var path = require('path');



var async = require('async');
var socketio = require('socket.io');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
var messages = [];
var sockets = [];
var _estados = [];

router.get('/webhoot2', function (req, res) {// diz o endereço, que é webhoot2
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === 'senha@senha') {
    console.log("Validação ok");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.log('Validacao falhou');
    res.sendStatus(403);// se der erro retorna 403

  }
});

router.post('/webhoot2', function (req, res) {
  var data = req.body;
  if (data && data.object === 'page') {

    data.entry.forEach(function (entry) {
      var pageID = entry.id;//id da pagina que está envidando
      var timeOfEvent = entry.time;//timestemp

      entry.messaging.forEach(function (event) {
        if (event.message) {//se for mensagem de texto normal
          trataMensagem(event);
        } else {
          if (event.postback && event.postback.payload) {//se for botao

            switch (event.postback.payload) {
              case 'botao_comecar':// s eo botao for o começar

                sendTextMessage(event.sender.id, "Olá! Eu irei te ajudar. ");
                sendFirstMenu(event.sender.id);

                break;

              case 'validar_cpf':// se o botao for validar cpf - o calculo n será aqui, chamara outra função para realizar

                _estados[event.sender.id] = "calculo-cpf";//estados recebe calculo cpf, isso serve para saber se em outras função qual opção foi clicada
                pegaNumero(event);

                break;

              case 'validar_cnpj':// se o botão for cnpj

                _estados[event.sender.id] = "calculo-cnpj";
                pegaNumero(event);

                break;

              case 'clicou_sair':// se o botão for sair
                _estados[event.sender.id] = "clicou-sair";
                sendTextMessage(event.sender.id, 'Muito obrigado por entrar em contato conosco. Até algum dia!');
                break;

              case 'opcao_Sim':// se opção for sim
                sendFirstMenu(event.sender.id);
                _estados[event.sender.id] = "";// colca vazio

                break;

              case 'Opcao_Nao':// se que quee mais informações.
                sendTextMessage(event.sender.id, "Obrigado por entrar em contato conosco :)! Caso precise, estaremos sempre disponiveis para você. tenha um ótimo dia!");
                break;
            }

          }
        }
      })
    })

    res.sendStatus(200);
  }
});

var trataMensagem = require('./tratarMensagem.js');//(event);//vai tratar a mensagem

var sendTextMessage = require('./sendTextMessage.js');//(recipient, messageText);

var sendFirstMenu = require('./sendFirstMenu.js');//(recipientId);

var sendSimOuNao = require('./sendSimOuNao.js');//(recipientId);

var callSendAPI = require('./callSendAPI.js');//(messageData);

var validaCPF = require('./validaCPF.js');//(cpf);

var validaCNPJ = require('./validaCNPJ.js');//(CNPJ);

var showOptionsMenu = require('./showOptionsMenu.js');//(recipientId);

var pegaNumero = require('./pegaNumero.js');//(event);


//os codigo daqui de baixo sõ do servidor

io.on('connection', function (socket) {
  messages.forEach(function (data) {
    socket.emit('message', data);
  });

  sockets.push(socket);

  socket.on('disconnect', function () {
    sockets.splice(sockets.indexOf(socket), 1);
    updateRoster();
  });

  socket.on('message', function (msg) {
    var text = String(msg || '');

    if (!text)
      return;

    socket.get('name', function (err, name) {
      var data = {
        name: name,
        text: text
      };

      broadcast('message', data);
      messages.push(data);
    });
  });

  socket.on('identify', function (name) {
    socket.set('name', String(name || 'Anonymous'), function (err) {
      updateRoster();
    });
  });
});

function updateRoster() {
  async.map(
    sockets,
    function (socket, callback) {
      socket.get('name', callback);
    },
    function (err, names) {
      broadcast('roster', names);
    }
  );
}

function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data);
  });
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});


//botaocomecar=botao_comecar