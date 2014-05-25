'use strict';

angular.module('diceAngularApp')
  .controller('DiceController', function ($scope) {

    $scope.onlyNumbers = /^\d+$/;

    $scope.dice = diceBySystem[0];

    $scope.roll = {
      "multiplier": 1,
      'numRolls': 1,
      'numSides': 6,
      'beforeMultiplyBonus': 0,
      'afterMultiplyBonus': 0
    };

    $scope.rollHistory = "Welcome to my multi-system dice roller!\n";

    $scope.result = 0;

    $scope.quickRoll = function (die, $event) {
      $scope.roll = {
        "multiplier": 1,
        'numRolls': 1,
        'numSides': die,
        'beforeMultiplyBonus': 0,
        'afterMultiplyBonus': 0
      };

      $scope.rollDice( $event );

    };

    $scope.rollDice = function ( $event ) {
      var total = 0;
      var rolls = new Array( $scope.roll.numRolls );

      var beforeMultiplyBonus = parseInt($scope.roll.beforeMultiplyBonus) || 0;
      var afterMultiplyBonus = parseInt($scope.roll.afterMultiplyBonus) || 0;

      var rollString = "Rolling " + getRollDescription($scope.roll.multiplier, $scope.roll.numRolls, $scope.roll.numSides, beforeMultiplyBonus, afterMultiplyBonus);
      rollString += "\n";

      if ($scope.roll.multiplier > 1) {
        rollString += $scope.roll.multiplier + " * ( ";
      }

      rollString += "( "

      for( var i = 0; i < $scope.roll.numRolls; i++ ) {
        var rollOne = randomInt( 1, $scope.roll.numSides );
        if( i == 0 )
          rollString += rollOne;
        else
          rollString += " + " + rollOne;

        rolls[i] = rollOne;
        total += rollOne;
      }

      rollString += " )";

      total += beforeMultiplyBonus;

      if( beforeMultiplyBonus != 0 )
        rollString += " + " + beforeMultiplyBonus;

      if ($scope.roll.multiplier > 1) {
        total *= $scope.roll.multiplier;
        rollString += " )";
      }

      if (afterMultiplyBonus != 0) {
        total += afterMultiplyBonus;
        rollString += " + " + afterMultiplyBonus;
      }

      rollString += " = " + total + "\n";

      $scope.rollHistory += rollString;

      angular.element($event.target).scope().result = total;
    };

    $scope.clearHistory = function() {
      $scope.rollHistory = "History cleared\n";
    };

  });
