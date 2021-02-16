var express = require('express');
var socket = require('socket.io');
//app setup

var app = express();
var server = app.listen(3000, function() {
    console.log('porta 3000');
});

//static
app.use(express.static('public'));

//docket setup
var userid = 0;

var io = socket(server);

io.on('connection', function(socket) {
    console.log('connessione effettuata');
    console.log(socket.id);

    socket.on('player', function(data) {
        io.sockets.emit('player', data);
    });
    
});