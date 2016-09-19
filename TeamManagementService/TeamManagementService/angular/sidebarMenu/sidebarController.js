var app = angular.module('tmsApp');


app.controller('sidebarController', ['$scope', 'userService', '$uibModal', function ($scope, userService, $uibModal) {
    vm = this;
    vm.isOpen = false;


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
    }
}]);