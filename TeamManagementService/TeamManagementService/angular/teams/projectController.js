var app = angular.module('tmsApp');

app.controller('projectController', ['$scope', '$rootScope', 'projectService', 'appService', function ($scope, $rootScope, projectService, appService) {

    vm = this;

    vm.newProject = {
        name: "",
        adminId: 0
    }

    vm.selectedProject = "select a project";

    vm.projects = [];

    var init = function () {
        projectService.get().then(function (response) {
            $scope.projects = response;
        });
    }

    init();

    vm.add = function (project) {
        project.adminId = appService.getLoginInfo().id;
        projectService.add(project);
    };

    vm.selectProject = function (project) {
        vm.selectedProject = project.name;
        $scope.$broadcast('selected-project-changed', project);
    }
}]);