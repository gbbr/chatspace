PulseTester.MapFactory = function() {

    function Map(props) {
        var domNode  = document.getElementById(props.domNode || 'mapCanvas'),
            position = new google.maps.LatLng(props.center[0], props.center[1]);

        this.instance = new google.maps.Map(domNode, {
            center: position,
            zoom: props.zoom
        });
    }

    Map.prototype = {
        markers: [],

        markerStyle: {

        },

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
        }
    }

    return Map;
}