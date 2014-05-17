
PulseTester.components = angular.module('PulseTester.Components', []);

PulseTester.components.factory('$socket', function() {
    return {
        socket: void 0,

        create: function() {
            if( !this.socket ) {
                this.socket = io.connect('http://localhost:4242', { 'force new connection': true });
                this.socket.on('connect', function() { console.log('Socket :: Connected'); });
                this.socket.on('disconnect', function() { console.log('Socket :: Disconnected'); });
            } else {
                this.socket.socket.connect();
            }

            return this.socket;
        },

        disconnect: function() {
            socket.disconnect();
        }
    }
});