'use strict';

angular.module('materialApp')
  .controller('RedditController', function ($scope, $window) {
    $scope.posts = [];
    // reddit.top('pennystocks').t('day').limit(10).fetch(function(res) {
    reddit.hot('pennystocks').limit(20).fetch(function(res) {
        // res contains JSON parsed response from Reddit
        for (var i = 1; i < res.data.children.length; i++) {
            var post = res.data.children[i].data;
            console.log(post);
            $scope.posts.push({'author': post.author, 'ups': parseInt(post.ups), 'title': post.title, 'url': post.url});
        }
        $scope.$apply();
    });

    $scope.openTab = function(url) {
        $window.open(url, '_blank');
    }
//        reddit.comments(res.data.children[0].data.id, "pennystocks").limit(1).sort("hot").fetch(function(res) {
//        console.log(res[1].data.children[0].data.body);
//        });
});
