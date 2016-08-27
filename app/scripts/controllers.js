'use strict';

angular.module('myControllers', [])
    .controller('authController', function($scope) {
        $scope.handleLoginBtnClick = function() {
            $auth.submitLogin($scope.loginForm)
                .then(function(resp) {})
                .catch(function(resp) {
                    $scope.error = 'Invalid login or password!';
                });
        };

        $scope.handleRegBtnClick = function() {
            $auth.submitRegistration($scope.registrationForm)
                .then(function(resp) {})
                .catch(function(resp) {});
        };

        $scope.handleSignOutBtnClick = function() {
            $auth.signOut()
                .then(function(resp) {})
                .catch(function(resp) {});
        };
    })
    .controller('analyserController', function($scope, AnalyserService) {
        $scope.analyse = function() {
            AnalyserService.analyse($scope.first_dataset.split(',').map(Number))
                .then(function(result) {
                    $scope.result = result;
                });
        };

        $scope.correlation = function() {
            AnalyserService.correlation($scope.first_dataset.split(',').map(Number),
                                        $scope.second_dataset.split(',').map(Number))
                .then(function(result) {
                    $scope.result = result;
                });
        };

    });
