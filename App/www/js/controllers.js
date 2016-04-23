angular.module('starter.controllers', [])

.controller('FeedsCtrl', function($scope, $http, $state, FeedService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:

  // $scope.$on('$ionicView.enter', function(e) {
  // });
  FeedService.getFeed().then(function(res) {
    $scope.comments = res;
  }, function(err) {
    console.log(err);
  });

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
