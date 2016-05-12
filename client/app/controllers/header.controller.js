'use strict';

angular.module('materialApp')
  .controller('HeaderController', function ($scope, player) {
  	$scope.loop = false;
  	$scope.playing = null;
    $scope.pauseSong = function() {
      player.pause();
    }

    $scope.resumeSong = function() {
      player.play();
    }

    $scope.enableLoop = function() {
      player.loop = !player.loop;
      $scope.loop = player.loop;
    }
  });
