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
})
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('MapCtrl', function($scope, $ionicLoading, $compile, $ionicModal) {
  function initialize() {
    var myLatlng = new google.maps.LatLng(43.07493, -89.381388);

    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
      mapOptions);

    //Marker + infowindow + angularjs compiled ng-click
    var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
    var compiled = $compile(contentString)($scope);

    var infowindow = new google.maps.InfoWindow({
      content: compiled[0]
    });

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Uluru (Ayers Rock)'
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });

    $scope.map = map;
  }
  google.maps.event.addDomListener(window, 'load', initialize);

  $scope.centerOnMe = function() {
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      alert(pos.coords.latitude);
      $scope.loading.hide();
    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });
  };

  $scope.clickTest = function() {
    alert('Example of infowindow with ng-click')
  };

  $scope.addTrap = function() {
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    var coord;

    navigator.geolocation.getCurrentPosition(function(pos) {
      //$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      coord = pos.coords.latitude.toString() + ' ' + pos.coords.longitude.toString();
      alert(coord);
    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });

  };

  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
      $scope.modal.hide();
  };
    // cleanup modal
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // execute action on hide
  $scope.$on('modal.hidden', function() {
    // nothing for now
  });
  $scope.$on('modal.removed', function() {
    // kill things
  });
});
