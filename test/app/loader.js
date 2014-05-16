
var PulseTester = PulseTester || {}; // namespace

require.config({
    baseUrl: 'app'
});

require(
    ['https://maps.googleapis.com/maps/api/js?sensor=true',
     'vendor/angular.min'], function() {
            require(
                [ 'vendor/socket.io.min',
                  'services' ], function() {
                    require(['controllers'], function () {
                        angular.bootstrap(document, ['PulseTester']);
                    })
                });
        }
    );
