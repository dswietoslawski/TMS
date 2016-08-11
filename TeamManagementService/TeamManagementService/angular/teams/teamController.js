var app = angular.module('tmsApp');

app.controller('teamController', ['$scope', 'teamService', 'appService' , function ($scope, teamService, appService) {
    $scope.newTeam = {
        name: "asdf",
        admin: { }
    }

    $scope.add = function (team) {
        team.adminUser = appService.currentUser;
        teamService.add(team); // get a promise use login function if SUCCESS
    };
}]);