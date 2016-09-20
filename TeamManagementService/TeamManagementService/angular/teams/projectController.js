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
        }).then(function (error) {

        });
    }

    if ($scope.hmCtrl.isLoggedIn) init();

    vm.update = function () {
        $rootScope.$broadcast('selected-project-changed', vm.projects.selected);
    }

    $scope.$on('project-added', function (event, args) {
        vm.projects.items.push(args);
        vm.projects.selected = args;
        vm.update();
    });
}]);