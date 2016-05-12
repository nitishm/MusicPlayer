'use strict';

angular.module('materialApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('player', {
        url: '/',
        views: {
            'header': {
                templateUrl : 'app/views/header.html',
                controller  : 'HeaderController'
            },
            'content': {
                templateUrl : 'app/views/main.html',
                controller  : 'MainController'
            },
            'footer': {
                templateUrl : 'app/views/footer.html',
            }
        }
      });
  });
