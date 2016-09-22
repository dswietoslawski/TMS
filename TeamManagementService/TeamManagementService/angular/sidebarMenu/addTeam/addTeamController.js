var app = angular.module('tmsApp');

app.controller('addTeamController', ['$scope', '$rootScope', 'userService', 'User', '$timeout', '$q', '$uibModalInstance', 'projectService', 'appService',
    function ($scope, $rootScope, userService, User, $timeout, $q, $uibModalInstance, projectService, appService) {
        var vm = this;

        vm.submitTeam = function () {
            vm.newProject.adminId = appService.getLoginInfo().id;
            var promise = projectService.add(vm.newProject);

            vm.isAddTeamButtonDisabled = true;

            promise.then(function (response) {
                $rootScope.$broadcast('project-added', response.data);
                vm.isAddTeamButtonDisabled = false;
                vm.newProject.name = "";
                $uibModalInstance.close();

            }).then(function (error) {
                vm.isAddTeamButtonDisabled = false;
            });

        };
        vm.close = function () {
            $uibModalInstance.close();
        };

    }]);