'use strict';

angular.module('myControllers', [])
    .controller('authController', function($scope, $auth) {
        $scope.handleLoginBtnClick = function(loginForm) {
            $auth.submitLogin(loginForm);
        };

        $scope.handleRegBtnClick = function(registrationForm) {
            $auth.submitRegistration(registrationForm);
        };

        $scope.handleSignOutBtnClick = function() {
            $auth.signOut();
        };
    })
    .controller('analyserController', function($scope, AnalyserService) {
        $scope.readFileTo = function(model) {
            var reader = new FileReader();
            reader.onload = function() {
                $scope.$apply(function() {
                    $scope[model] = reader.result;
                });
            };
            reader.readAsText(event.target.files[0]);
        };

        $scope.analyse = function() {
            AnalyserService.analyse($scope.first_dataset.match(/\d+/g).map(Number))
                .then(function(result) {
                    $scope.result = result;
                });
        };

        $scope.correlation = function() {
            AnalyserService.correlation(
                    $scope.first_dataset.match(/\d+/g).map(Number),
                    $scope.second_dataset.match(/\d+/g).map(Number))
                .then(function(result) {
                    $scope.result = result;
                });
        };

    });
