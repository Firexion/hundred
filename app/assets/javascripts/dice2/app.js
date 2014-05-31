'use strict';

angular
  .module('diceAngularApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/dice', {
        templateUrl: '../../views/dice/main.html',
        controller: 'DiceController'
      })
      .otherwise({
        redirectTo: '/dice'
      });
  });
