'use strict';

var app = angular.module('PulseTester', ['PulseTester.Components']);

app.controller('AppController', function($scope, PlayerManager) {
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
                nickname: nickName
            },
            space: null,
            log: null,
            socket: null
        });

        var setActive;

        players.push(player);

        (setActive = function(_marker) {
            var position = _marker.getPosition();

            angular.forEach(players, function(player) {
                player.styleIcon.set("color", "ddddff");
            });

            _marker.styleIcon.set("color", "88ff88");

            $scope.player = {
                nickname: _marker.data.nickname,
                latitude: position.lat(),
                longitude: position.lng()
            }

            $scope.$apply();

        })(player, nickName);

        google.maps.event.addListener(player, 'drag', function() { setActive(player); });
        google.maps.event.addListener(player, 'click', function() { setActive(player); });
        google.maps.event.addListener(player, 'dragend', function() {/*sync with server*/});
    }

    google.maps.event.addListener(map, "rightclick", function(event) {
        var nickName = prompt("Enter nickname: ");
        addPlayer(event.latLng, nickName || "Player #" + (players.length + 1));
    });
});