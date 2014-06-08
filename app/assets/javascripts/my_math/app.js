'use strict';

angular
  .module('myApp', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/my_math', {
        templateUrl: '../../views/my_math/index.html',
        controller: 'MyCtrl'
      })
      .otherwise({
        redirectTo: '/my_math'
      });
  });
