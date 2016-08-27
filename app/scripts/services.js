'use strict';

angular.module('myServices', [])
    .factory("AnalyserService", function($http) {
        return {
            analyse: function(dataset) {
                return $http({
                    method: 'POST',
                    url: 'http://localhost:3000/analyser/analyse',
                    data: {
                        'dataset': dataset
                    },
                }).then(function(response) {
                    return response.data;
                }, function(response) {
                    return null;
                });
            },
            correlation: function(first_dataset, second_dataset) {
                return $http({
                    method: 'POST',
                    url: 'http://localhost:3000/analyser/correlation',
                    data: {
                        'first_dataset': first_dataset,
                        'second_dataset': second_dataset
                    },
                }).then(function(response) {
                    return response.data;
                }, function(response) {
                    return null;
                });
            }
        };
    });
