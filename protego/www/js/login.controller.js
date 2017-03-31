
angular.module('starter.controllers')
.controller('loginCtrl', function ($scope, $http, $state) {
  $scope.data = {};

  $scope.user = JSON.parse(localStorage.getItem('user'));

  $scope.login = function () {


    $http({
      method: 'POST',
      url: "http://10.25.15.43:3000/login",
      data: {
        username: $scope.data.username,
        password: $scope.data.password,
      }

    }).then (function(response){
      $scope.user = response.data;
      localStorage.setItem('user', JSON.stringify(response.data))
    })
  }


  $scope.register = function () {

    $http({
      method: 'POST',
      url: "http://10.25.15.43:3000/register",
      data: {
        username: $scope.data.newusername,
        password: $scope.data.newpassword,
        firstname: $scope.data.newfirstname,
        lastname: $scope.data.newlastname,
      }
    }).then (function(response){
      $scope.user = response.data;
      localStorage.setItem('user', JSON.stringify(response.data))
    })
  }

$scope.logout = function (){
  $scope.user = null;
  localStorage.removeItem('user')
}

$scope.saveContacts = function () {

$http({
  method: 'POST',
  url: 'http://10.25.15.43:3000/api/users/' + $scope.user._id,
  data: $scope.user

}).then (function(response){
    localStorage.setItem('user', JSON.stringify($scope.user))
  alert ("Your info has been updated!")
})

}


})
