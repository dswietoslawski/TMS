var app = angular.module('tmsApp');

app.service('userService', ['$http', 'appService', 'httpService', '$q', function ($http, appService, httpService, $q) {

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
            .error(function (error) {
                def.reject(parseErrors(error));
            });

        return def.promise;
    };

    this.getByTeam = function (teamId) {
        var url = 'http://localhost:63601/api/teams/' + teamId + '/users';
        return httpService.get(url);
    };

    this.get = function () {
        var url = 'http://localhost:63601/api/accounts/users';
        return httpService.get(url);
    }

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
        errors = errors.toString();
        return errors.replace(',', '<br />');
    }
}]);