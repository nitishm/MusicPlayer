'use strict';

angular.module('materialApp')
  .controller('MainController', function ($scope, $http, player) {
    $scope.player = player;
    $scope.isPlaying = false;
    $scope.loop = 0;
    $scope.repeat_icon = "assets/icons/repeat.svg";
    $scope.loading = true;

    $scope.playSong = function(song) {
      $scope.playing = song.title;
      player.src = "songs/" + song.file;
      player.load();
      player.play();
      player.loop = $scope.loop;
      $scope.isPaused = false;
      $scope.isPlaying = true;
    }

    player.ontimeupdate = function() {
      $scope.progress = (player.currentTime/player.duration) * 100;
      $scope.buffered = player.buffered;
      $scope.$apply();
    }

    player.onplaying = function() {
      $scope.isPlaying = true;
    }

    player.onended = function() {
      $scope.isPlaying = false;
    }

    $scope.seekPosition = function() {
      console.log($scope.position);
      player.currentTime = $scope.position;
    }

    $scope.pauseSong = function() {
      player.pause();
      $scope.isPaused = true;
    }

    $scope.resumeSong = function() {
      player.play();
      $scope.isPaused = false;
    }

    $scope.enableLoop = function() {
      player.loop = !player.loop;
      $scope.loop = player.loop;
      if(player.loop) {
          $scope.repeat_icon = "assets/icons/repeat-one.svg";
      }
      else {
          $scope.repeat_icon = "assets/icons/repeat.svg";
      }
    }

    $http.get('/api/player').success(function(songs) {
      $scope.songs = songs;
      $scope.loading = false;
    });
  });
