PulseTester.AppController = ['$scope', '$socket', '$map', function($scope, $socket, Map) {

    var map = new Map({
        'domNode': 'map',
        'center': [51.5099104, -0.1288205],
        'zoom': 16
    });

    var players = [];

    google.maps.event.addListener(map.instance, "rightclick", function(event) {
        var nickName = prompt("Enter nickname: ");
        addPlayer(event.latLng, nickName || "Player #" + (players.length + 1));
    });

    function addPlayer(latLng, nickName) {

        var player = map.addMarker({
            position: latLng,
            data: {
                nickname: nickName,
                channel: null, /* group of chat room members */
                socket: $socket.create()
            }
        });

        player.data.socket.emit('player-data', {
            name: nickName,
            latitude: latLng.lat(),
            longitude: latLng.lng()
        });

        players.push(player);

        var highlightMarker;
        (highlightMarker = function(player) {
            var position = player.getPosition();

            /*player.socket.socket.sessionid*/

            angular.forEach(players, function(player) {
                player.styleIcon.set("color", "ddddff");
            });

            player.styleIcon.set("color", "88ff88");

            $scope.player = {
                nickname: player.data.nickname,
                latitude: position.lat(),
                longitude: position.lng()
            }

            $scope.$apply();

        })(player, nickName);

        google.maps.event.addListener(player, 'drag', function() { highlightMarker(player); });

        google.maps.event.addListener(player, 'click', function() {
            /*var flightPath = new google.maps.Polyline({
             path: [player.position, players[0].position],
             geodesic: true,
             strokeColor: '#FF0000',
             strokeOpacity: 1.0,
             strokeWeight: 2,
             map: map
             });*/

            highlightMarker(player);
            console.log(player);
        });

        google.maps.event.addListener(player, 'dragend', function() {/*sync with server*/});
    }
}];