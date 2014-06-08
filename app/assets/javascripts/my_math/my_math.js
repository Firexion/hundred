'use strict';

angular.module('myApp')
  .controller('MyCtrl', function ($scope) {

    $scope.num1 = 0;
    $scope.num2 = 0;

    $scope.factorial = function (num) {
      if (typeof num === 'object') return 0;
      if (num === 0) {
          return 1;
      } else {
          return (num * $scope.factorial(num - 1));
      }
    };

    $scope.fibonacci = function (num) {
      if (typeof num === 'object') return 0;
      var memo = [0, 1];
      var fib = function (num) {
        var result = memo[num];

        if (typeof result !== 'number') {
          result = fib(num - 1) + fib(num - 2);
          memo[num] = result;
        }
        return result;
      };
      return fib(num);
    };

    $scope.encrypt = function (str) {
      if (str === undefined) return '';

      str = str.replace(/[\.,-\/#!?$%\^&\*\'\";:{}=\-_`~()\[\]\\`~ ]/g, "");
      str = str.toLowerCase();

      var ret = $scope.chunkString(str);

      str = $scope.cryptoSquare(ret);
      return $scope.addSpaces(str, 5);
    };

    $scope.decrypt = function (str) {
      if (str === undefined) return "";

      str = str.replace(/[ ]/g, "");
      str = $scope.returnSpaces(str);
      return $scope.unCryptoSquare(str).replace(/[ ]/g, "");
    };

    $scope.chunkString = function (str) {
      var square = Math.ceil(Math.sqrt(str.length));
      var ret = new Array(square),
        offset;

      for (var i = 0; i < square; i++) {
        offset = i * square;
        ret[i] = str.substring(offset, offset + square);
      }

      return ret;
    };

    $scope.returnSpaces = function (str) {
      var square = Math.ceil(Math.sqrt(str.length));
      var diff = square * square - str.length;
      var newStr = '';

      if (diff < square) {
        for (var i = 0; i < diff; i++) {
          str = str.slice(0, str.length - i * square) + ' ' + str.slice(str.length - i * square, str.length);
        }
        newStr = str;
      }

      if (diff > square) {
        for (var k = 0; diff > square; k++,diff--) {
          if ( k === 0)
            str = str.slice(0, str.length - k * square) + ' ' + str.slice(str.length - k * square, str.length);
          else
            str = str.slice(0, str.length - k * square + k) + ' ' + str.slice(str.length - k * square + k, str.length);
        }
        newStr = str;
      }

      if (diff === square) {
        newStr = '';
        for (var j = 0; j < square; j++) {
          newStr += str.slice(j * (square - 1), (j+1) * (square - 1));
          newStr += ' ';
        }
      }

      return newStr;
    };

    $scope.cryptoSquare = function (ret) {
      var result = '';

      for (var i = 0; i < ret.length; i++) {
        for (var j = 0; j < ret.length; j++) {
          if (typeof ret[j][i] === 'string') {
            result += ret[j][i];
          }
        }
      }
      return result;
    };

    $scope.unCryptoSquare = function (str) {
      var result = '';
      var square = Math.sqrt(str.length);
      for (var i = 0; i < square; i++) {
        for (var j = 0; j < str.length; j+=square) {
          result += str[j + i];
        }
      }
      return result;
    };

    $scope.addSpaces = function (str, num) {
      var ret = '';
      for (var i = 0; i < str.length; i += num) {
        ret += str.slice(i, i + num);
        ret += ' ';
      }
      return ret;
    };
});
