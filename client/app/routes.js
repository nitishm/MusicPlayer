'use strict';

angular.module('materialApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('player', {
        url: '/',
        views: {
            'content': {
                templateUrl : 'app/views/main.html',
                controller  : 'MainController'
            }
        }
      })
      .state('player.songs' ,{ 
        url: 'songs',
        templateUrl : 'app/views/songs.html',
      })
      .state('player.radio' ,{ 
        url: 'radio',
        templateUrl : 'app/views/radio.html',
      });
  });
