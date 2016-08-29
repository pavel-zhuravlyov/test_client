'use strict';

var myApp = angular.module('myApp', ['ng-token-auth', 'ui.router', 'config' , 'myControllers', 'myServices'])
    .config(function($authProvider, $stateProvider, $urlRouterProvider, ENV_VARS) {
        $authProvider.configure({
            apiUrl: ENV_VARS.apiUrl,
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
    })
    .directive('updateModelOnChange', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('change', function () {
                    scope.readFileTo(attrs.updateModelOnChange);
                });
            }
        };
    });
