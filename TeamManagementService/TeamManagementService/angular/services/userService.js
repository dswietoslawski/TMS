var app = angular.module('tmsApp');

app.service('userService', function ($http) {

    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    this.register = function (user) {
        var response = $http.post('http://localhost:63601/api/accounts/register', user, config)
        return response;
    }

    this.login = function (user) {
        var response = $http.post('http://localhost:63601/api/accounts/login', user, config)
        return response;
    }

    this.logout = function (user) {
        var response = $http.post('http://localhost:63601/api/accounts/logout', user, config)
        return response;
    }
});