var ModalCtrl = function ($scope, $modal, $log) {

  $scope.save = function (customRoll) {

    var saveModal = $modal.open({
      templateUrl: 'saveRollContent.html',
      controller: SaveRollCtrl,
      resolve: {
        customRoll: function () {
		  customRoll.name = "initial";
          return customRoll;
        }
      }
    });

    saveModal.result.then(function(customRoll) {
	    saveCustomRoll(customRoll);
	  }, function () {
        $log.info('Modal dismissed at: ' + new Date());
	  });
  };

  $scope.edit = function (customRoll) {

    var editModal = $modal.open({
      templateUrl: 'editRollContent.html',
      controller: EditRollCtrl,
      resolve: {
        customRoll: function () {
          return customRoll;
        }
      }
    });

    editModal.result.then(function(newRoll) {
	    editCustomRoll(newRoll);
	  }, function () {
        $log.info('Modal dismissed at: ' + new Date());
	  });
  };



};


var SaveRollCtrl = function ($scope, $modalInstance, customRoll) {
  $scope.roll = customRoll;

  $scope.ok = function () {
    $modalInstance.close($scope.roll);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};

var EditRollCtrl = function ($scope, $modalInstance, $log, customRoll) {
  $scope.roll = {
	  name: customRoll.name,
	  id: customRoll.id,
	  multiplier: customRoll.multiplier,
	  numRolls: customRoll.numRolls,
	  numSides: customRoll.numSides,
	  beforeMultiplyBonus: {value: customRoll.beforeMultiplyBonus.value, op: customRoll.beforeMultiplyBonus.op},
	  afterMultiplyBonus: {value: customRoll.afterMultiplyBonus.value, op: customRoll.afterMultiplyBonus.op},
	  display: customRoll.display
	};

  $scope.ok = function () {
    $modalInstance.close($scope.roll);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};
