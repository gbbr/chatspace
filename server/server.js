var app    = require('express')(),
	server = require('http').createServer(app),
	io     = require('socket.io').listen(server);

server.listen(4242);

io.sockets.on('connection', function (socket) {

    socket.on('disconnect', function() {
        console.log('====== DISCONNECTED ====', socket.id);
    });

    //io.sockets.emit('connected', socket.id);

    socket.on('player-data', function(data) {
      console.log('========== CONNECTED ==========');
      console.log('NICKNAME: ', data.name);
      console.log('POSITION: Lat(', data.latitude, ') Lng(', data.longitude ,')');
      console.log('SOCKET: ', socket.id);
      console.log('===============================');
      //io.sockets.emit('message', { id: socket.id, body: data.nickname });
    });
});