angular.module('starter.controllers', ['ionic.native' ,'ngMap'])



.controller('HomeCtrl', function($scope, $cordovaGeolocation, $interval) {


$scope.polyLine =[];


//cordova gps location
$scope.onSuccess = function(location) {
  $scope.polyLine.push(location.latLng)
  console.log($scope.polyLine);

  $scope.msg = ["Current your location:\n",
    "latitude:" + location.latLng.lat,
    "longitude:" + location.latLng.lng,
    "speed:" + location.speed,
    "time:" + location.time].join("\n");

    $scope.map.addPolyline({
        points: $scope.polyLine,
        'color' : '#AA00FF',
        'width': 10,
        'geodesic': true
      });

//my marker code
    // $scope.makeMarker = function(){
    //   console.log('marker');
    //   $scope.map.addMarker({
    //     position : {lat : 40, lng : -105}
    //   })
    // }

// cordova map plugin marker code
  // $scope.map.addMarker({
  //   'position': location.latLng,
  //   'title': $scope.msg
  // }, function(marker) {
  //   marker.showInfoWindow();
  // });




  $scope.map.animateCamera({
    target:location.latLng,
    zoom: 17,
    tilt: 60,
    // bearing: 140,
    duration: 5000
  })
}




// step-counter
  document.addEventListener('deviceready', function () {
    console.log('Device is ready!', document.getElementById('map'));
    // setTimeout(function(){
    if(document.getElementById('map')){
    $scope.map = plugin.google.maps.Map.getMap(document.getElementById('map'));
    $scope.map.addEventListener(plugin.google.maps.event.MAP_READY, function(){
      console.log('MAS IS RDY');
    })

  }

  // }, 100)
    // map for map tab
      // $cordovaGeolocation.getCurrentPosition()
      // .then(function(resp){
      //   $scope.geoData = resp;
      //   console.log(resp.coords.latitude);
      //
      // }, function(err){
      //   console.log(err);
      // })


    $scope.stepcounter = stepcounter;
    $scope.stepSuccess = function(data) {
      console.log('STEP!', data);
    }

    $scope.$on('$ionicView.enter', function(){
      $scope.$apply(function(){


        $scope.stepcounter.getStepCount(function(steps){
          $scope.trackHistory = steps;
        })
        $scope.stepcounter.getTodayStepCount(function(steps){
          $scope.history = steps;
        })
      })
    })

// step-counter toggle feature
$scope.trackToggle = function(){
  $scope.tracking = !$scope.tracking

  $scope.stepcounter.getTodayStepCount($scope.stepSuccess)
  $scope.stepcounter.getStepCount($scope.stepSuccess)
  if($scope.tracking){
    // set interval
    $scope.stepcounter.start(0, $scope.stepSuccess, function(){console.log('start err');})
  }
  else{
    // clear interval
    $scope.stepcounter.stop($scope.stepSuccess, function(){console.log('stop err');})

  }
  }


})
})






.controller('PanicCtrl', function($scope) {

})




.controller('NavCtrl', function($scope, NgMap) {

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
