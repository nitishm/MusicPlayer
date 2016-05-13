'use strict';

angular.module('materialApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('player', {
        url: '/',
        templateUrl : 'app/views/main.html',
        controller  : 'MainController'
      })
      .state('player.songs' ,{ 
        url: 'songs',
        templateUrl : 'app/views/songs.html',
      })
      .state('player.radio' ,{ 
        url: 'radio',
        templateUrl : 'app/views/radio.html',
      })
    .state('reddit' ,{
        url: '/reddit'  ,
        templateUrl: 'app/views/reddit.html',
        controller: 'RedditController'
    });
    $urlRouterProvider
      .otherwise('/songs');
  });
