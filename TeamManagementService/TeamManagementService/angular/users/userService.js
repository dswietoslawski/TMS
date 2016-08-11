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
                appService.currentUser = response;
                def.resolve(response);
            }).error(function (data) {
                def.reject("Failed to login");
            });

        return def.promise;
    };

    this.logout = function (user) {
        var def = $q.defer();

        $http.post('http://localhost:63601/api/accounts/logout', user, config)
            .success(function (response) {
                appService.currentUser = {};
                def.resolve(response);
            }).error(function (data) {
                def.reject("Failed to logout");
            });

        return def.promise;
    };
}]);