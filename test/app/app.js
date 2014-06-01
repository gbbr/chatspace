'use strict';

var app = angular.module('PulseTester', []);

app.controller('AppController', PulseTester.AppController);

app.factory('$socket', PulseTester.SocketFactory);
app.factory('$map', PulseTester.MapFactory);