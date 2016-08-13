var app = angular.module('tmsApp');

app.service('teamService', function ($http) {

    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    this.add = function (team) {
        var response = $http.post('http://localhost:63601/api/teams', team, config)
        return response;
    }

    this.get = function () {
        var response = $http.get('http://localhost:63601/api/teams', team, config)
        return response;
    }

    this.getById = function (id) {
        var response = $http.get('http://localhost:63601/api/teams' + id, user, config)
        return response;
    }
});