var app = angular.module('tmsApp');

app.controller('teamController', ['$scope', 'teamService', 'appService' , function ($scope, teamService, appService) {
    $scope.newTeam = {
        name: "asdf",
        admin: { }
    }

    $scope.add = function (team) {
        team.adminUserId = appService.currentUser.id;
        teamService.add(team);
    };
}]);