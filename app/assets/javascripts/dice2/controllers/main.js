'use strict';

angular.module('diceAngularApp')
  .controller('DiceController', function ($scope, $rootScope, $log) {

	$scope.custom = true;

    $scope.dice = diceBySystem[0];

	$scope.savedRolls = savedRollsBySystem[0];

    $scope.roll = {
      multiplier: 1,
      numRolls: 1,
      numSides: 6,
      beforeMultiplyBonus: {value: 0, op: '+'},
      afterMultiplyBonus: {value: 0, op: '+'}
    };

    $scope.rollHistory = "Welcome to my multi-system dice roller!\n";

    $scope.result = 0;
	$scope.customResult = 0;

    $scope.quickRoll = function (die, $event) {
      $event.roll = {
        multiplier: 1,
        numRolls: 1,
        numSides: die,
        beforeMultiplyBonus: {value: 0, op: '+'},
        afterMultiplyBonus: {value: 0, op: '+'}
      };

      $scope.rollDice( $event );

    };

	$scope.rollSaved = function (saved, $event) {
      $event.roll = {
	    multiplier: saved.multiplier,
	    numRolls: saved.numRolls,
	    numSides: saved.numSides,
	    beforeMultiplyBonus: saved.beforeMultiplyBonus,
	    afterMultiplyBonus: saved.afterMultiplyBonus
      };

      $scope.rollDice( $event );

    };

	$scope.rollCustom = function () {

	  $scope.rollDice($scope);
	};

    $scope.rollDice = function ( $event ) {
      var total = 0;
      var rolls = new Array( $event.roll.numRolls );

      var beforeMultiplyBonus = parseInt($event.roll.beforeMultiplyBonus.value) || 0;
      var afterMultiplyBonus = parseInt($event.roll.afterMultiplyBonus.value) || 0;

      var rollString = "Rolling " + getRollDescription($event.roll.multiplier, $event.roll.numRolls, $event.roll.numSides, $event.roll.beforeMultiplyBonus, $event.roll.afterMultiplyBonus);
      rollString += "\n";

      if ($event.roll.multiplier > 1) {
        rollString += $event.roll.multiplier + " * ( ";
      }

      rollString += "( "

      for( var i = 0; i < $event.roll.numRolls; i++ ) {
        var dieRoll = randomInt( 1, $event.roll.numSides );
        if( i == 0 )
          rollString += dieRoll;
        else
          rollString += " + " + dieRoll;

        rolls[i] = dieRoll;
        total += dieRoll;
      }

      rollString += " )";

	  if ($event.roll.beforeMultiplyBonus.op === '+')
        total += beforeMultiplyBonus;
	  else
	    total -= beforeMultiplyBonus;

      if( beforeMultiplyBonus !== 0 )
        rollString += " " + $event.roll.beforeMultiplyBonus.op + " " + beforeMultiplyBonus;

      if ($event.roll.multiplier > 1) {
        total *= $event.roll.multiplier;
        rollString += " )";
      }



      if (afterMultiplyBonus !== 0) {
        if ($event.roll.afterMultiplyBonus.op === '+') {
		  total += afterMultiplyBonus;
		} else {
		  total -= afterMultiplyBonus;
		}

		rollString += " " + $event.roll.afterMultiplyBonus.op + " " + afterMultiplyBonus;
      }

      rollString += " = " + total + "\n";

      $scope.rollHistory += rollString;

      var $el = $("#rollHistory");
      $el.scrollTop($el[0].scrollHeight);

	  if ($event === $scope) {
	    $scope.customResult = total;
	  } else {
		angular.element($event.target).scope().result = total;
	  }
    };

    $scope.clearHistory = function() {
      $scope.rollHistory = "History cleared\n";
    };



	$rootScope.customSaveConfirmation = "/dice2/partials/customSaveConfirmation.html";
	$rootScope.editRoll = "dice2/partials/editRoll.html";
	$rootScope.rollInput = "dice2/partials/rollInput.html";

	$rootScope.onlyNumbers = /^\d+$/;

  });
