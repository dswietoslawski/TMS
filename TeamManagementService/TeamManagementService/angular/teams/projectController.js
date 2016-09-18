var app = angular.module('tmsApp');

app.controller('projectController', ['$scope', '$rootScope', 'projectService', 'appService', function ($scope, $rootScope, projectService, appService) {

    vm = this;

    vm.newProject = {
        name: "",
        adminId: 0
    }
    vm.projects = {};

    vm.projects.selected = {};

    vm.projects.items = [];

    var init = function () {
        projectService.get().then(function (response) {
            vm.projects.items = response;
        });
    }

    init();

    vm.add = function (project) {
        project.adminId = appService.getLoginInfo().id;
        projectService.add(project);
    };

    vm.update = function () {
        $rootScope.$broadcast('selected-project-changed', vm.projects.selected);
    }
}]);