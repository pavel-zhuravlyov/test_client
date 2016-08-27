'use strict';

var myApp = angular.module('myApp', ['ng-token-auth', 'ui.router', 'myControllers'])
    .config(function($authProvider, $stateProvider, $urlRouterProvider) {
        $authProvider.configure({
            apiUrl: 'http://localhost:3000'
        });

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'partials/mainForm.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'partials/loginForm.html'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'partials/registerForm.html'
            });
    })
    .run(function($rootScope, $state, $auth) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
            return $auth.validateUser().then(
                function() {
                    if (toState.name === 'login' || toState.name === 'register') {
                        $state.go('main');
                        return event.preventDefault();
                    }
                },
                function() {
                    if (toState.name === 'main') {
                        $state.go('login');
                        return event.preventDefault();
                    }
                });
        });

        $rootScope.$on('auth:login-success', function(event) {
            $state.go('main');
            return event.preventDefault();
        });


        $rootScope.$on('auth:logout-success', function(event) {
            $state.go('login');
            return event.preventDefault();
        });
    });


var myControllers = angular.module('myControllers', []);

myControllers.controller('authController', function($scope) {
    $scope.handleLoginBtnClick = function() {
        $auth.submitLogin($scope.loginForm)
            .then(function(resp) {})
            .catch(function(resp) {});
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
