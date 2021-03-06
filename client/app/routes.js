'use strict';

angular.module('materialApp')
  .config(function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {

    $urlMatcherFactoryProvider.strictMode(false);

    $urlRouterProvider
      .when('/reddit', '/reddit/worldnews')
      .otherwise('/songs');

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
      })
      .state('reddit.listings', {
        url: '/:subreddit',
        views: {
          'content@reddit' :{
            templateUrl: 'app/partials/reddit-listings.html',
            controller: 'RedditListingController'
          }
        }
      })
      .state('reddit.listings.detail', {
        url: '/:id',
        views: {
          'content@reddit' :{
            templateUrl: 'app/partials/reddit-listings-detail.html',
            controller: 'RedditListingDetailController'
          }
        }
      });
  });
