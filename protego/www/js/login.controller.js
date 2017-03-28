
angular.module('starter.controllers')
.controller('loginCtrl', function ($scope, $http, $state) {
  $scope.data = {};

  $scope.login = function () {

    $http({
      method: 'POST',
      url: "http://localhost:3000/login",
      data: {
        username: $scope.data.username,
        password: $scope.data.password,
      }
    }).then (function(response){
      $scope.user = response.data;
    })
  }

  $scope.register = function () {

    $http({
      method: 'POST',
      url: "http://localhost:3000/register",
      data: {
        username: $scope.data.newusername,
        password: $scope.data.newpassword,
        firstname: $scope.data.newfirstname,
        lastname: $scope.data.newlastname,
      }
    }).then (function(response){
      $scope.user = response.data;
    })
  }
})
