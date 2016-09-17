var app = angular.module('tmsApp');

app.controller('toDoItemEditController', ['$scope', '$rootScope', 'toDoItemService', 'userService', 'appService', 'itemForEdit', '$uibModalInstance', 'ToDoItem',
    function ($scope, $rootScope, toDoItemService, userService, appService, itemForEdit, $uibModalInstance, ToDoItem) {

        var vm = this;

        vm.errorMessage = "";
        vm.teamUsers = [];
        vm.editedToDoItem = new ToDoItem(itemForEdit);

        vm.userSelection = {
            users: [],
            selectedOption: {}
        };

        vm.close = function () {
            $uibModalInstance.close(vm.editedToDoItem);
        };

        vm.save = function () {
            var promise = toDoItemService.update(vm.editedToDoItem.copy());
            promise.then(function () {
                vm.editedToDoItem = promise.$$state.value;
            }, function (error) {
                vm.errorMessage = "Couldn't update item";
            })// get a promise use login function if SUCCESS
        }

        function init() {
            var promise = userService.getByTeam(vm.editedToDoItem.team.id);
            promise.then(function () {
                vm.userSelection.users = promise.$$state.value;
                vm.userSelection.selectedOption = vm.editedToDoItem.user;
            });
        }

        init();

    }]);