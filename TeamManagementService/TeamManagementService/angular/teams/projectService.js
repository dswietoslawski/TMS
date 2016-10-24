var app = angular.module('tmsApp');

app.service('projectService', ['$http', '$q', 'httpService', function ($http, $q, httpService) {

    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    this.add = function (team) {
        var response = $http.post('http://localhost:63601/api/teams', team, config)
        return response;
    }

    this.get = function (userId) {
        var def = $q.defer();

        var response = $http.get('http://localhost:63601/api/users/' + userId + '/teams', config)
        .success(function (response) {
            def.resolve(response);
        }).error(function (error) {
            def.reject("Error");
        });

        return def.promise;
    }

    this.getById = function (id) {
        var response = httpService.get('http://localhost:63601/api/teams' + id, config)
        return response;
    }

    this.addUser = function (teamId, userId) {
        var response = httpService.put('http://localhost:63601/api/teams/' + teamId + '/users/' + userId);
        return response;
    }

    this.deleteUser = function (teamId, userId) {
        var response = httpService.delete('http://localhost:63601/api/teams/' + teamId + '/users/' + userId);
        return response;
    }

    this.delete = function (teamId) {
        var response = httpService.delete('http://localhost:63601/api/teams/' + teamId);
    }
}]);