'use strict';

/* Directives */
angular.module('diceAngularApp').directive('plusMinusToggle', function() {
  return {
    restrict: 'E',
    scope:{
      value: '='
    },
    template: '<span>\
				<button ng-show="showButton(value.op)" ng-click="buttonClick()">\
				  <span ng-bind="value.op"></span>\
				</button>\
				<input type="text" size="2" ng-pattern="onlyNumbers" ng-model="value.value"/>\
			  </span>',
    replace: true,
    link: function($scope) {
	  $scope.onlyNumbers  = /^\d+$/;
      $scope.showButton = function(op) {
        return op !== undefined;
      };
      $scope.buttonClick = function() {
        if($scope.value.op === '+')
          $scope.value.op = '-';
        else
          $scope.value.op = '+';
      };
    }
  };
});
