
PulseTester.components = angular.module('PulseTester.Components', []);

PulseTester.components.factory('$socket', function() {
    return {
        sockets: [],

        create: function() {
            var socket = io.connect('http://localhost:4242', { 'force new connection': true });
            socket.on('connect', function() { console.log('Socket :: Connected'); });
            socket.on('disconnect', function() { console.log('Socket :: Disconnected'); });

            this.sockets.push(socket);
            return socket;
        },

        disconnect: function() {
            socket.disconnect();
        }
    }
});