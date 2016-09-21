var app = angular.module('tmsApp');

app.service('toDoItemService', ['httpService', function (httpService) {

    var serviceBase = 'http://localhost:63601/api/';
    this.getByTeam = function (teamId) {
        var url = serviceBase + 'teams/' + teamId + '/todoitems';
        return httpService.get(url);
    }

    this.get = function (itemId) {
        var url = serviceBase + 'todoitems/' + itemId;
        return httpService.get(url);
    }

    this.getByUser = function (userId) {
        var url = serviceBase + 'users/' + userId + '/todoitems';
        return httpService.get(url);
    }

    this.getByTeamUser = function (teamId, userId) {
        var url = serviceBase + 'teams/' + teamId + '/users/' + userId + '/todoitems';
        return httpService.get(url);
    }

    this.update = function (toDoItem, teamId, userId) {
        var url = serviceBase + 'teams/' + teamId + '/users/' + userId + '/todoitems';
        return httpService.put(url, toDoItem);
    }

    this.add = function (toDoItem, teamId, userId) {
        toDoItem.status = "ToDo";
        var url = serviceBase + 'teams/' + teamId + '/users/' + userId + '/todoitems';
        return httpService.post(url, toDoItem);
    };

    this.delete = function (toDoItem, teamId) {
        var url = serviceBase + 'teams/' + teamId + '/todoitems';
        return httpService.delete(url, toDoItem);
    }
}]);