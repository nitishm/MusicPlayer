'use strict';

angular.module('materialApp')
  .controller('MainController', function ($rootScope, $scope, $http, $state, player) {
    $scope.state = $state.current.url;
    $scope.player = player;
    $scope.isPlaying = false;
    $scope.isRadio = false;
    $scope.loop = 0;
    $scope.repeat_icon = "assets/icons/repeat.svg";
    $scope.loading = true;

    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams, options) { 
        $scope.state = toState.url;
        if($scope.state === 'radio') $scope.isRadio = true;
        else {
          $scope.isRadio = false;
          player.src = "";
          player.play();
          player.currentTime = $scope.progress = $scope.buffered = 0;
          $scope.isPlaying = $scope.isPaused = false;
        }
      }
    );

    player.ontimeupdate = function() {
      if($scope.isRadio) {
        $scope.progress = 0;
        $scope.buffered = 0;
      } else {
        $scope.progress = (player.currentTime/player.duration) * 100;
        $scope.buffered = player.buffered;
        $scope.$apply();
      }
    }

    player.onplaying = function() {
      $scope.isPlaying = true;
    }

    player.onended = function() {
      $scope.isPlaying = false;
    }

    $scope.seekPosition = function() {
      player.currentTime = $scope.position;
    }

    $scope.playSong = function(song) {
      $scope.isRadio = false;
      $scope.playing = song.title;
      player.src = "songs/" + song.file;
      player.load();
      player.play();
      player.loop = $scope.loop;
      $scope.isPaused = false;
      $scope.isPlaying = true;
    }

    $scope.playRadio = function(radio) {
      $scope.isRadio = true;
      $scope.playing = radio.title;
      player.src = radio.url;
      player.load();
      player.play();
      player.loop = $scope.loop;
      $scope.isPaused = false;
      $scope.isPlaying = true;
    }

    $scope.pauseSong = function() {
      player.pause();
      $scope.isPaused = true;
    }

    $scope.resumeSong = function() {
      player.play();
      $scope.isPaused = false;
    }

    $scope.stopSong = function() {
      player.pause();
      player.currentTime = 0;
      $scope.isPlaying = $scope.isPaused = false;
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

    $scope.radios = [{title: 'Dubai City FM 101.6', url: 'http://playerservices.streamtheworld.com/api/livestream-redirect/ARNCITY_SC'}];
  });
