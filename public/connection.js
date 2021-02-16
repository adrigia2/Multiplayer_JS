//connection
var socket = io.connect('http://79.51.147.171:3000');

const id =new Date().getUTCMilliseconds();
socket.on('connect', function() {
    console.log(socket.id);
});

function syncPlayer(player) {
    socket.emit('player', player);
}

const players = [];