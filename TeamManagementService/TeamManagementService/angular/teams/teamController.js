var app = angular.module('tmsApp');

app.controller('teamController', ['$scope', '$rootScope', 'teamService', 'appService', function ($scope, $rootScope, teamService, appService) {
    $scope.newTeam = {
        name: "",
        adminId: 0
    }

    $scope.selectedProject = "select a project";

    $scope.projects = [];

    var init = function () {
        teamService.get().then(function (response) {
            $scope.projects = response;
        });
    }

    init();

    $scope.add = function (team) {
        team.adminId = appService.getLoginInfo().id;
        teamService.add(team);
    };

    $scope.selectProject = function (project) {
        $scope.selectedProject = project.name;
        $scope.$broadcast('selected-project-changed', project);
    }
}]);