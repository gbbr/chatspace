var app    = require('express')(),
	server = require('http').createServer(app),
	io     = require('socket.io').listen(server);

server.listen(4242);

io.sockets.on('connection', function (socket) {
  io.sockets.emit('connected', socket.id);

  socket.on('message', function(msg) {
    console.log('==== MESSAGE ====', msg);
  	io.sockets.emit('message', { id: socket.id, body: msg });
  });
});