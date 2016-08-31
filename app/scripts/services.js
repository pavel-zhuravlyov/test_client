'use strict';

angular.module('myServices', [])
  .factory("AnalyserService", function($http, ENV_VARS) {
    return {
      analyse: function(dataset) {
        return $http({
          method: 'POST',
          url: ENV_VARS.apiUrl + '/analyser/analyse',
          data: {
            'dataset': dataset
          },
        }).then(function onFulfilled(response) {
          return { result: response.data };
        }, function onRejected(response) {
          return { errors: response.data.errors };
        });
      },
      correlation: function(first_dataset, second_dataset) {
        return $http({
          method: 'POST',
          url: ENV_VARS.apiUrl + '/analyser/correlation',
          data: {
            'first_dataset': first_dataset,
            'second_dataset': second_dataset
          },
        }).then(function onFulfilled(response) {
          return { result: response.data };
        }, function onRejected(response) {
          return { errors: response.data.errors };
        });
      }
    };
  });
