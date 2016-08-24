'use strict';

var myApp = angular.module('myApp', ['ng-token-auth', 'myControllers']);

myApp.config(function($authProvider) {
    $authProvider.configure({
        apiUrl: 'http://localhost:3000'
    });
});


var myControllers = angular.module('myControllers', []);

myControllers.controller('authController', function($scope, $auth) {
    $scope.handleLoginBtnClick = function() {
        $auth.submitLogin($scope.loginForm)
            .then(function(response) {
            })
            .catch(function(response) {});
    };

    $scope.handleSignOutBtnClick = function() {
      $auth.signOut()
        .then(function(resp) {
        })
        .catch(function(resp) {
        });
    };
});

myControllers.controller('analyserController', function($scope, $http, $auth) {
    $scope.analyse = function() {
        var dataset = $scope.first_dataset.split(',').map(Number);
        $http({
            method: 'POST',
            url: 'http://localhost:3000/analyser/analyse',
            data: {
                'dataset': dataset
            },
        }).then(function successCallback(response) {
            $scope.result = response.data;
        }, function errorCallback(response) {});
    };

    $scope.correlation = function() {
        var first_dataset = $scope.first_dataset.split(',').map(Number);
        var second_dataset = $scope.second_dataset.split(',').map(Number);
        $http({
            method: 'POST',
            url: 'http://localhost:3000/analyser/correlation',
            data: {
                'first_dataset': first_dataset,
                'second_dataset': second_dataset
            },
        }).then(function successCallback(response) {
            $scope.result = response.data;
        }, function errorCallback(response) {});
    };

});
