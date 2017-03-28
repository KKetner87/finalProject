angular.module('starter.controllers', ['ionic.native' ,'ngMap'])

.controller('HomeCtrl', function($scope) {})

.controller('PanicCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});


})

.controller('NavCtrl', function($scope, NgMap, $cordovaGeolocation, $interval) {


$cordovaGeolocation.getCurrentPosition()
.then(function(resp){
    $scope.geoData = resp;
      $scope.format = 'M/d/yy h:mm:ss a';
 })




})

.controller('AccountCtrl', function($scope) {

});
