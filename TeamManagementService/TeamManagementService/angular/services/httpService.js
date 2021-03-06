﻿var app = angular.module('tmsApp');

app.service('httpService', ['$http', '$q', function ($http, $q) {

    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    this.get = function (url) {
        var def = $q.defer();

        var response = $http.get(url, config)
        .success(function (response) {
            def.resolve(response);
        }).error(function (error) {
            def.reject(parseErrors(error));
        });

        return def.promise;
    };

    this.post = function (url, data) {
        var def = $q.defer();

        var response = $http.post(url, data, config)
        .success(function (response) {
            def.resolve(response);
        }).error(function (error) {
            def.reject(parseErrors(error));
        });

        return def.promise;
    };

    this.put = function (url, data) {
        var def = $q.defer();

        var response = $http.put(url, data, config)
        .success(function (response) {
            def.resolve(response);
        }).error(function (error) {
            def.reject(parseErrors(error));
        });

        return def.promise;
    }

    this.delete = function (url, data) {
        var def = $q.defer();

        var response = $http.delete(url, data, config)
        .success(function (response) {
            def.resolve(response);
        }).error(function (error) {
            def.reject(parseErrors(error));
        });

        return def.promise;
    }

    function parseErrors(response) {
        var errors = [];
        for (var key in response.modelState) {
            for (var i = 0; i < response.modelState[key].length; i++) {
                errors.push(response.modelState[key][i]);
            }
        }
        return errors;
    }
}]);