'use strict';

angular.module('ticTacToeApp', ['ui.bootstrap'])
  .controller('TicTacToeController', function ($scope, $modal, $log) {

    $scope.gameOver = "tic-tac-toe/partials/gameOver.html";
    $scope.game = Game.create();

    $scope.mark = function (space) {
    	space.markBy($scope.game.turn);
    	var isGameOver = $scope.game.isGameOver();
    	if (isGameOver === true) {
    		$scope.endGame();
    	}
    	$scope.game.changeTurn();
    };

  	$scope.endGame = function () {
      var gameOverModal = $modal.open({
        templateUrl: 'tic-tac-toe/partials/gameOver.html',
        controller: GameOverCtrl,
        resolve: {
          winner: function () {
            return $scope.game.board.winner;
          }
        }
     });

     gameOverModal.result.then(function() {
       $scope.game.restart();
     }, function () {
         $log.info('Modal dismissed at: ' + new Date());
     });
   };
});

var GameOverCtrl = function ($scope, $modalInstance, winner) {
  if (winner === null) {
    $scope.winner = "Looks like a tie. \nGood game.";
  } else {
    $scope.winner = "Player " + winner.symbol + " wins!";
  }


  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};
