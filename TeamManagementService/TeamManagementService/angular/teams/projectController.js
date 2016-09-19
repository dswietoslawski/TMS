var app = angular.module('tmsApp');

app.controller('projectController', ['$scope', '$rootScope', 'projectService', 'appService', function ($scope, $rootScope, projectService, appService) {

    var vm = this;

    vm.newProject = {
        name: "",
        adminId: 0
    }

    vm.projects = {};
    vm.projects.selected = {};
    vm.projects.items = [];

    var init = function () {
        vm.projects = {};
        vm.projects.selected = {};

        projectService.get().then(function (response) {
            vm.projects.items = response;

            vm.projects.selected = vm.projects.items[0];
            vm.update();
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