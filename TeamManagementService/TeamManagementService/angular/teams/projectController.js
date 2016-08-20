var app = angular.module('tmsApp');

app.controller('projectController', ['$scope', '$rootScope', 'projectService', 'appService', function ($scope, $rootScope, projectService, appService) {
    $scope.newProject = {
        name: "",
        adminId: 0
    }

    $scope.selectedProject = "select a project";

    $scope.projects = [];

    var init = function () {
        projectService.get().then(function (response) {
            $scope.projects = response;
        });
    }

    init();

    $scope.add = function (project) {
        project.adminId = appService.getLoginInfo().id;
        projectService.add(project);
    };

    $scope.selectProject = function (project) {
        $scope.selectedProject = project.name;
        $scope.$broadcast('selected-project-changed', project);
    }
}]);