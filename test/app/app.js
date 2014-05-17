'use strict';

var app = angular.module('PulseTester', ['PulseTester.Components']);

app.controller('AppController', function($scope, $socket) {
    var mapOptions = {
        center: new google.maps.LatLng(51.5099104, -0.1288205),
        zoom: 16
    },
        players = [];

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    function addPlayer(latLng, nickName) {
        var markerStyle = new StyledIcon(StyledIconTypes.MARKER,
            {
                color: "00ff00",
                text: nickName
            });

        var player = new StyledMarker({
            styleIcon: markerStyle,
            map:map,
            draggable:true,
            animation: google.maps.Animation.DROP,
            position: latLng,
            data: {
                nickname: nickName,
                channel: null /* group of chat room members */
            }
        });

        player.socket = $socket.create();
        player.socket.emit('message', 'Hi from ' + nickName);

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
            var flightPath = new google.maps.Polyline({
                path: [player.position, players[0].position],
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
                map: map
            });

            highlightMarker(player);
        });

        google.maps.event.addListener(player, 'dragend', function() {/*sync with server*/});
    }

    google.maps.event.addListener(map, "rightclick", function(event) {
        var nickName = prompt("Enter nickname: ");
        addPlayer(event.latLng, nickName || "Player #" + (players.length + 1));
    });
});