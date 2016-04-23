angular.module('starter.services', [])

.service('FeedService', function($http, $q) {
  var url = apiBaseUrl + '/feed';

  return {
    getFeed: function(success, failure) {

    var deferred = $q.defer();
     $http.get(url)
       .success(function(res) {
         //console.log("res is: ", res);
         deferred.resolve(res);
       }).error(function(msg, code) {
          deferred.reject(msg);
          // Using JSON stringify to get the console to actually show the message
          console.log(JSON.stringify(msg), code);
       });
     return deferred.promise;

    },
    get: function(feedId) {
      for (var i = 0; i < feeds.length; i++) {
        if (feeds[i].id === parseInt(feedId)) {
          return feeds[i];
        }
      }
      return null;
    }
  };
});
