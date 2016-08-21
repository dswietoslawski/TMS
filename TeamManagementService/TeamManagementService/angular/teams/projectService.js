var app = angular.module('tmsApp');

app.service('projectService', ['$http', '$q', function ($http, $q) {

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
        var def = $q.defer();

        var response = $http.get('http://localhost:63601/api/teams', config)
        .success(function (response) {
            def.resolve(response);
        }).error(function (error) {
            def.reject("Error");
        });

        return def.promise;
    }

    this.getById = function (id) {
        var response = $http.get('http://localhost:63601/api/teams' + id, config)
        return response;
    }
}]);