var app = angular.module('tmsApp');

app.service('toDoItemService', ['httpService', function (httpService) {
    this.getByTeam = function (teamId) {
        var url = 'http://localhost:63601/api/teams/' + teamId + '/todoitems';
        return httpService.get(url);
    }

    this.get = function (itemId) {
        var url = 'http://localhost:63601/api/todoitems/' + itemId;
        return httpService.get(url);
    }

    this.getByUser = function (userId) {
        var url = 'http://localhost:63601/api/users/' + userId + '/todoitems';
        return httpService.get(url);
    }

    this.getByTeamUser = function (teamId, userId) {
        var url = 'http://localhost:63601/api/teams/' + teamId + '/users/' + userId + '/todoitems';
        return httpService.get(url);
    }
}]);