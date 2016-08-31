'use strict';

angular.module('myControllers', [])
  .controller('authController', function($scope, $auth) {
    $scope.handleLoginBtnClick = function(loginForm) {
      $scope.errors = []
      $auth.submitLogin(loginForm).catch(function(response) {
        $scope.errors = response.errors
      });
    };

    $scope.handleSignOutBtnClick = function() {
      $auth.signOut();
    };
  })
  .controller('registrationController', function($scope, $auth) {
    $scope.handleRegBtnClick = function(registrationForm) {
      $scope.errors = [];
      $auth.submitRegistration(registrationForm).catch(function(response) {
        $scope.errors = response.data.errors.full_messages;
      })
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

    var parseDataset = function(data) {
      if (data) {
        var dataset = data.match(/\d+/g);
        if (dataset && dataset.length > 1) {
          return dataset.map(Number);
        } else {
          return null;
        }
      } else {
        return null
      };
    };

    $scope.analyse = function() {
      var dataset = parseDataset($scope.first_dataset);
      $scope.second_dataset = '';

      $scope.result = {};
      $scope.errors = [];

      if (dataset) {
        $scope.first_dataset = dataset.join(', ');
        AnalyserService.analyse(dataset)
          .then(function(response) {
            $scope.result = response.result;
            $scope.errors = response.errors;
          });
      } else {
        $scope.errors = ['Invalid data'];
      };
    };

    $scope.correlation = function() {
      var first_dataset = parseDataset($scope.first_dataset);
      var second_dataset = parseDataset($scope.second_dataset);

      $scope.result = {};
      $scope.errors = [];

      if (first_dataset && second_dataset && first_dataset.length == second_dataset.length) {
        $scope.first_dataset = first_dataset.join(', ');
        $scope.second_dataset = second_dataset.join(', ');

        AnalyserService.correlation(first_dataset, second_dataset)
          .then(function(response) {
            $scope.result = response.result;
            $scope.errors = response.errors;
          });
      } else {
        $scope.errors = ['Invalid data'];
      };
    };
  });
