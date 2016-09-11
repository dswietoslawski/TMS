var app = angular.module('tmsApp');

app.service('userService', ['$http', 'appService', '$q', function ($http, appService, $q) {

    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    this.register = function (user) {
        var def = $q.defer();

        $http.post('http://localhost:63601/api/accounts/register', user, config)
            .success(function (response) {
                def.resolve("User registered");
            })
            .error(function () {
                def.reject("Failed to register");
            });

        return def.promise;
    };

    this.login = function (user) {
        var def = $q.defer();

        $http.post('http://localhost:63601/api/accounts/login', user, config)
            .success(function (response) {
                appService.setLoginInfo(response);
                def.resolve(response);
            }).error(function (data) {
                def.reject(parseErrors(data));
            });

        return def.promise;
    };

    this.logout = function (user) {
        var def = $q.defer();

        $http.post('http://localhost:63601/api/accounts/logout', user, config)
            .success(function (response) {
                appService.setLoginInfo(null);
                def.resolve(response);
            }).error(function (data) {
                def.reject("Failed to logout");
            });

        return def.promise;
    };

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