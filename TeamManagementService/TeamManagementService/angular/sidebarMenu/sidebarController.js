var app = angular.module('tmsApp');


app.controller('sidebarController', ['$scope', '$rootScope', 'userService', 'projectService','appService', '$uibModal', function ($scope, $rootScope, userService, projectService, appService, $uibModal) {
    var vm = this;
    vm.isOpen = false;

    vm.newProject = {
        id: 0,
        name: "",
        adminId: appService.getLoginInfo() != null ? appService.getLoginInfo().id : 0
    };

    vm.currentProject = {};


    $rootScope.$on('selected-project-changed', function (event, args) {
        vm.currentProject = args;
    });

    vm.editUsers = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '../sidebarMenu/addUser.html',
            backdrop: 'static',
            controller: 'addUserController',
            controllerAs: 'addUser',
            resolve: {
                projectToEdit: function () {
                    return $scope.hmCtrl.currentProject;
                }
            }
        });
    };

    vm.addTeam = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '../sidebarMenu/addUser.html',
            backdrop: 'static',
            controller: 'addTeamController',
            controllerAs: 'addTeam'
        });
    };

}]);