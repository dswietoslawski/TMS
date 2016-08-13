var app = angular.module('tmsApp');

app.controller('teamController', ['$scope', 'teamService', 'appService' , function ($scope, teamService, appService) {
    $scope.newTeam = {
        name: "",
        adminId: 0
    }

    $scope.add = function (team) {
        team.adminId = appService.getLoginInfo().adminId;
        teamService.add(team);
    };
}]);