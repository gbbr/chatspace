var app    = require('express')(),
	server = require('http').createServer(app),
	io     = require('socket.io').listen(server);

server.listen(5665);

io.sockets.on('connection', function (socket) {
  io.sockets.emit('connected', socket.id);

  socket.on('message', function(msg) {
  	io.sockets.emit('message', { id: socket.id, body: msg });
  });
});