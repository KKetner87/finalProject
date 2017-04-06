angular.module('starter.controllers', ['ionic.native' ,'ngMap'])



.controller('HomeCtrl', function($scope, $cordovaGeolocation, $interval, $cordovaVibration, $ionicPlatform, $timeout, $cordovaNativeAudio, $http) {


$scope.polyLine =[];

//cordova gps location
$scope.onSuccess = function(location) {
  $scope.polyLine.push(location.latLng)

  $scope.crimeLat =location.latLng.lat;
  $scope.crimeLon =location.latLng.lng;

//crimedata markers on map
$scope.crimeLatLon = ()=>{
  return {
    lat : $scope.crimeLat,
    lng : $scope.crimeLon
  }
};
$scope.crimeData();

$scope.crimeMsg = ["Crime Data"];

$scope.image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvu4DLlyZEuT91B4nf9EIyb6ykkxAw8bLzqD7KENR6JFML-tYA';


// $scope.image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvu4DLlyZEuT91B4nf9EIyb6ykkxAw8bLzqD7KENR6JFML-tYA';
//  $scope.crimeIcon =$scope.map.addMarker({
//     position:$scope.crimeLatLon(),
//     map: $scope.map,
//     icon: $scope.image,
//    'title': $scope.crimeMsg
//   }, function(marker) {
//     $scope.crimeOnMap = marker
//     marker.showInfoWindow();
//   });


  $scope.locationInfo = ["Current location:\n",
    "latitude:" + location.latLng.lat,
    "longitude:" + location.latLng.lng,
    "speed:" + location.speed,
    "time:" + location.time].join("\n");

    $scope.startMsg = ["You Are Here"];

    // polyline on map
  if($scope.polyOnMap){
    console.log('removing polyline...');
      $scope.polyOnMap.remove();
    }
    $scope.map.addPolyline({
        points: $scope.polyLine,
        'color' : '#FF0080',
        'width': 6 ,
        'geodesic': true
      }, function(polyLine){
        $scope.polyOnMap = polyLine
      });

// cordova map plugin marker code
if($scope.markerOnMap){
  $scope.markerOnMap.remove();
}
  $scope.map.addMarker({
    'position': location.latLng,
    'title': $scope.startMsg
  }, function(marker) {
    $scope.markerOnMap = marker
    marker.showInfoWindow();
  });

  // map camera view
$scope.map.animateCamera({
    target:location.latLng,
    zoom: 18,
    tilt: 60,
    duration: 5000
  })
}


// step-counter
  document.addEventListener('deviceready', function () {

    plugins.NativeAudio.preloadComplex('siren', 'sounds/siren.mp3', 1, 0, 0, ()=>{console.log('PRELOAD')}, (err)=>{console.log('NO PRELOAD', err);})

    console.log('Device is ready!', document.getElementById('map'));
    // setTimeout(function(){
    $scope.makeMap = function(){
    if(document.getElementById('map')){
    $scope.map = plugin.google.maps.Map.getMap(document.getElementById('map'));
    $scope.map.addEventListener(plugin.google.maps.event.MAP_READY, function(){
      console.log('MAPS IS RDY');
    })
  }

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
      $scope.user = JSON.parse(localStorage.getItem('user'));
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
    $scope.stepcounter.start(0, $scope.stepSuccess, function(){
      console.log('start err');
    })
    $scope.startPoly = setInterval(function(){
      $scope.map.getMyLocation($scope.onSuccess);
    }, 10000)
  }
  else{

    // clear interval
    $scope.stepcounter.stop($scope.stepSuccess, function(){
      console.log('stop err');
    })
      clearInterval($scope.startPoly);

  }
}


})

// panic button function

$scope.help = function (){

  $scope.sirenSound()

  // will vibrate the user's phone on button push
  $cordovaVibration.vibrate([1000,1000,1000]);


// will send out sms messages to emergency contacts
        $scope.smsSuccess = function (hasPermission) {
          console.log('perm', $scope.user);
            if (hasPermission) {
              console.log('You got permish');
              $scope.map.getMyLocation(function(location){
                var lastKnown = location.latLng;
                for(var key in $scope.user.emergency){

                  var contact = $scope.user.emergency[key]

                  sms.send(contact.phone, `${$scope.user.firstname} was on a run and needs help immediately! They are at this location - http://maps.google.com/maps?z=12&t=m&q=loc:${lastKnown.lat}+${lastKnown.lng}`, {
                    replaceLineBreaks: false, // true to replace \n by a new line, false by default
                    android: {
                        intent: ''  // send SMS with the native android SMS messaging
                        //intent: '' // send SMS without open any other app
                    }

                  });
              }
            })

            }
            else {
              alert("Message could not be sent!");
            }
        };
        var error = function (e) { alert('Something went wrong:' + e); };
        sms.hasPermission($scope.smsSuccess);
    }


    // will play alarm sound using the native audio plugin
    $scope.sirenSound = function () {
      console.log('SIREN');
      // $ionicPlatform.ready(function() {

      var sound = new Media('/android_asset/www/sounds/siren.mp3')
      sound.play()
  }

  // crimedata
  $scope.crimeData = function () {


    $http({
      method: 'GET',
      url: "http://138.68.231.253:3000/crimestuff",
      params: {
        lat: $scope.crimeLat,
        lon: $scope.crimeLon,
      }

    }).then (function(response){
      //   $scope.user = response.data;
      //   localStorage.setItem('user', JSON.stringify(response.data))
      console.log(response.data);


      $scope.image = 'https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Burglar-32.png';

      $scope.assaultCrimes= function(query){
      return query.type == 'Assault';
    }
    if(response.data){
      response.data = response.data.filter($scope.assaultCrimes);

      for (var i =0; i < response.data.length; i++){


        $scope.map.addMarker({
       position: {
            lat: response.data[i].lat,
            lng: response.data[i].lon,
          },
          map: $scope.map,
          icon: $scope.image,
        }, function(marker) {
          $scope.crimeOnMap = marker
          marker.showInfoWindow();
        });

      }
    }
    })
  }




// ending bracket
})




// .controller('PanicCtrl', function($scope) {
//
//
//
//
//
//
// .controller('NavCtrl', function($scope, NgMap) {
//
// })
//
//
//
//
// .controller('AccountCtrl', function($scope, $cordovaCamera) {
//
//   // $scope.clickIt = function(){
//   //   $cordovaCamera.getPicture({
//   //     quality : 100
//   //   })
//   //   .then(function(imgData){
//       // $scope.imgData = 'data:image/jpeg;base64,' + imgData;
//   //   })
//   //   .catch(function(err){
//   //     alert(err)
//     })
