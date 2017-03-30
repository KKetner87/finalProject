angular.module('starter.controllers', ['ionic.native' ,'ngMap'])



.controller('HomeCtrl', function($scope, $cordovaGeolocation, $interval) {
  // document.addEventListener("deviceready", function () {
  //   console.log('!!')
  // })
  $cordovaGeolocation.getCurrentPosition()
  .then(function(resp){
    $scope.geoData = resp;
    $scope.format = 'M/d/yy h:mm:ss a';
  })

  document.addEventListener('deviceready', function () {
    var success = function (message) {
      console.log(message)
    }

    var failure = function () {
      console.log("Error calling CordovaStepCounter Plugin! :(");
    }

    // Start the step counter
    // startingOffset will be added to the total steps counted in this session.
    // ie. say you have already recorded 150 steps for a certain activity, then
    // the step counter records 50. The getStepCount method will then return 200.
    var startingOffset = 0;
    stepcounter.start(startingOffset, success, failure);

    // Stop the step counter
    stepcounter.stop(success, failure);

    // Get the amount of steps for today (or -1 if it no data given)
    stepcounter.getTodayStepCount(success, failure);

    // Get the amount of steps since the start command has been called
    $scope.stepcounter.getStepCount(success, failure);

    // Returns true/false if Android device is running >API level 19 && has the step counter API available
    stepcounter.deviceCanCountSteps(success, failure);

    // Get the step history (JavaScript object)
    // sample result :
    //{
    //  "2015-01-01":{"offset": 123, "steps": 456},
    //  "2015-01-02":{"offset": 579, "steps": 789}
    //  ...
    //}
    stepcounter.getHistory(
      function (historyData) {
        console.log('HISTORY!')
        success(historyData);
      },
      failure
    );
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
