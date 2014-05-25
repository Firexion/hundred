'use strict';

angular
  .module('diceAngularApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
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
