PulseTester.AppController = ['$scope', '$map', function($scope, Map) {
    new Map({
        'domNode': 'map',
        'center': [51.5099104, -0.1288205],
        'zoom': 16,
        'view': $scope
    });
}];