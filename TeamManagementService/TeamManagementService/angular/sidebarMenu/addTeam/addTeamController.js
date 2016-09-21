var app = angular.module('tmsApp');

app.controller('addTeamController', ['$scope', '$rootScope', 'userService', 'User', '$timeout', '$q', '$uibModalInstance', 'projectToEdit', 'projectService',
    function ($scope, $rootScope, userService, User, $timeout, $q, $uibModalInstance, projectToEdit, projectService) {
        var vm = this;

        vm.submitTeam = function () {
            var promise = projectService.add(vm.newProject);

            vm.isAddTeamButtonDisabled = true;

            promise.then(function (response) {
                $rootScope.$broadcast('project-added', response.data);
                vm.isAddTeamButtonDisabled = false;
                vm.newProject.name = "";

            }).then(function (error) {
                vm.isAddTeamButtonDisabled = false;
            });

        };
        vm.close = function () {
            $uibModalInstance.close();
        };

    }]);