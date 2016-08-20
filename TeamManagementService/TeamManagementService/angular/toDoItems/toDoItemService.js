var app = angular.module('tmsApp');

app.service('toDoItemService', ['$http', '$q', function ($http, $q) {

    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    this.getByTeam = function (teamId) {
        var url = 'http://localhost:63601/api/teams/' + teamId + '/todoitems';
        return getPromise(url);
    }

    this.get = function (itemId) {
        var url = 'http://localhost:63601/api/todoitems/' + itemId;
        var response = $http.get(url, config);
        return response;
    }

    this.getByUser = function (userId) {
        var url = 'http://localhost:63601/api/users/' + userId + '/todoitems';
        return getPromise(url);
    }

    this.getByTeamUser = function (teamId, userId) {
        var url = 'http://localhost:63601/api/teams/' + teamId + '/users/' + userId + '/todoitems';
        return getPromise(url);
    }

    var getPromise = function (url) {
        var def = $q.defer();

        var response = $http.get(url, config)
        .success(function (response) {
            def.resolve(response);
        }).error(function (error) {
            def.reject("Failed to get items");
        });

        return def.promise;
    }
}]);