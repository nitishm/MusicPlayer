'use strict';

angular.module('materialApp')
  .factory('RedditFactory', function ($q) {
  	return {
  		getHotPosts: function(name, number) {
  			var deferred = $q.defer();
  			var data = [];
  			reddit.hot(name).limit(number).fetch(function(res) {
		        for (var i = 0; i < res.data.children.length; i++) {
		            var post = res.data.children[i].data;
		            if(post.permalink) post.permalink = "http://www.reddit.com" + post.permalink;
		            data.push(post);
		        }
		        deferred.resolve(data);
			});
			return deferred.promise;
  		},
  		getTopPosts: function(name, number) {
  			var deferred = $q.defer();
  			var data = [];
  			reddit.top(name).t('day').limit(number).fetch(function(res) {
		        for (var i = 0; i < res.data.children.length; i++) {
		            var post = res.data.children[i].data;
		            if(post.permalink) post.permalink = "http://www.reddit.com" + post.permalink;
		            data.push(post);
		        }
		        deferred.resolve(data);
			});
			return deferred.promise;
  		},
  		getComments: function(id, subreddit) {
  			var deferred = $q.defer();
  			var data = [];
  			reddit.comments(id, subreddit).sort("best").fetch(function(res) {
            	deferred.resolve(res[1].data.children);
        	});
        	return deferred.promise;
  		},
  		getSubreddits: function() {
  			// var deferred = $q.defer();
  			// var data = [];
  			// reddit.popularSubreddits().limit(5).fetch(function(res) {
  			// 	console.log(res.data.children);
     //        	deferred.resolve(res.data.children);
     //    	});
     //    	return deferred.promise;
  			return ['pennystocks', 'worldnews', 'funny', 'ShowerThoughts', 'LifeProTips', 'stocks', 'pics'];
  		}
	}
});
