'use strict';

angular.module('materialApp')
  .controller('RedditController', function ($scope, RedditFactory) {
    $scope.subreddits = RedditFactory.getSubreddits();
  })
  .controller('RedditListingController', function ($scope, $stateParams, $window, RedditFactory) {
    $scope.loading = true;
    RedditFactory.getHotPosts($stateParams.subreddit, 50).then(function(data) {
        console.log($stateParams.subreddit);
        $scope.attributes = {'subreddit': $stateParams.subreddit, 'type': 'top', 'number': 20};
        $scope.posts = data;
        $scope.loading = false;
    });

    $scope.updatePosts = function(name, type) {
        $scope.attributes.subreddit = name;
        $scope.attributes.type = type;
        $scope.loading = true;
        if(type === 'hot') {
            RedditFactory.getHotPosts(name, 50).then(function(data) {
                $scope.attributes.subreddit = name;
                $scope.attributes.type = type;
                $scope.posts = data;
                $scope.loading = false;
            });
        }
        else if(type === 'top') {
            RedditFactory.getTopPosts(name, 50).then(function(data) {
                $scope.attributes.subreddit = name;
                $scope.attributes.type = type;
                $scope.posts = data;
                $scope.loading = false;
            });
        }
    }

    $scope.showComments = function(post) {
        RedditFactory.getComments(post.id, post.subreddit).then(function(data) {
            console.log(data);
            // TODO : Open alert with list of comments
        });
    }

    $scope.openTab = function(url) {
        $window.open(url, '_blank');
    }
  });
