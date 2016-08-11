var app = angular.module('tmsApp');

app.controller('teamController', ['$scope', 'teamService', function ($scope, teamService) {
    $scope.newTeam = {
        name: "asdf"
    }

    $scope.add = function (team) {
        teamService.add(team); // get a promise use login function if SUCCESS
    };
}]);