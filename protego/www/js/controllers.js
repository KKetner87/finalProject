angular.module('starter.controllers', ['ionic.native' ,'ngMap'])

.controller('HomeCtrl', function($scope) {})


.controller('PanicCtrl', function($scope) {

})

.controller('NavCtrl', function($scope, NgMap, $cordovaGeolocation, $interval) {


$cordovaGeolocation.getCurrentPosition()
.then(function(resp){
    $scope.geoData = resp;
    $scope.format = 'M/d/yy h:mm:ss a';
 })

})


.controller('AccountCtrl', function($scope, $cordovaCamera) {

$scope.clickIt = function(){
  $cordovaCamera.getPicture({
      quality : 100
    })
      .then(function(imgData){
        $scope.imgData = 'data:image/jpeg;base64,' + imgData;
      })
      .catch(function(err){
        alert(err)
      })
    }

});
