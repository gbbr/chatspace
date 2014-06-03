PulseTester.MapFactory = ['$socket', function($socket) {

    function Map(props) {
        var domNode  = document.getElementById(props.domNode || 'mapCanvas'),
            position = new google.maps.LatLng(props.center[0], props.center[1]);

        this.instance = new google.maps.Map(domNode, {
            center: position,
            zoom: props.zoom
        });

        this.view = props.view;

        google.maps.event.addListener(this.instance, "rightclick", function(event) {
            var nickName = prompt("Enter nickname: ");
            this.addPlayer(event.latLng, nickName || "Player #" + (this.markers.length + 1));
        }.bind(this));
    }

    Map.prototype = {
        markers: [],
        currentPlayer: -1,

        addMarker: function(args) {
            var options = {
                map: this.instance,
                styleIcon: new StyledIcon(StyledIconTypes.MARKER,
                    {
                        color: "00ff00",
                        text: args.data.nickname
                    }),
                draggable: true,
                animation: google.maps.Animation.DROP
            }

            angular.extend(options, args);

            return new StyledMarker(options);
        },

        addPlayer: function(position, nickName) {
            var player = this.addMarker({
                position: position,
                data: {
                    nickname: nickName,
                    channel: null, /* group of chat room members */
                    latitude: position.lat(),
                    longitude: position.lng(),
                    socket: $socket.create()
                }
            });

            player.data.socket.emit('player-data', {
                name: nickName,
                latitude: position.lat(),
                longitude: position.lng()
            });

            this.markers.push(player);
            this.setActive(player);

            google.maps.event.addListener(player, 'dragend', function() {
                // Update position
                player.data.latitude = player.getPosition().lat();
                player.data.longitude = player.getPosition().lng();

                this.setActive(player);
            }.bind(this));

            google.maps.event.addListener(player, 'click', function() {
                this.setActive(player);
            }.bind(this));
        },

        setActive: function(player) {
            angular.forEach(this.markers, function(player) {
                player.styleIcon.set("color", "ddddff");
            });

            player.styleIcon.set("color", "88ff88");

            this.view.player = player.data;
            this.view.$apply();
        }
    }

    return Map;
}]