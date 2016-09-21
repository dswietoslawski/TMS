var app = angular.module('tmsApp');

app.controller('toDoItemEditController', ['$scope', '$rootScope', 'toDoItemService', 'userService', 'appService', 'itemForEdit', '$uibModalInstance', 'ToDoItem',
    function ($scope, $rootScope, toDoItemService, userService, appService, itemForEdit, $uibModalInstance, ToDoItem) {

        var vm = this;

        vm.mode = "Edit";
        vm.confirmButtonVal = "Save";

        vm.errorMessage = "";
        vm.teamUsers = [];
        vm.editedToDoItem = new ToDoItem(itemForEdit);

        vm.userSelection = {
            users: [],
            selectedOption: {}
        };

        vm.typeSelection = {
            types: [],
            selectedOption: {}
        };

        vm.close = function () {
            $uibModalInstance.close(vm.editedToDoItem);
        };

        vm.save = function () {
            vm.editedToDoItem.type = vm.typeSelection.selectedOption.value;

            var promise;

            if (vm.mode == "Add")
                promise = toDoItemService.add(vm.editedToDoItem.copy(), vm.editedToDoItem.team.id, vm.userSelection.selectedOption.id);
            else
                promise = toDoItemService.update(vm.editedToDoItem.copy(), vm.editedToDoItem.team.id, vm.userSelection.selectedOption.id);

            promise.then(function () {
                vm.editedToDoItem = new ToDoItem(promise.$$state.value);
                if (vm.mode == "Add") {
                    $rootScope.$broadcast('item-added');
                }
                $uibModalInstance.close(vm.editedToDoItem);
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

            if (vm.editedToDoItem.id === 0) {
                vm.confirmButtonVal = "Add new item";
                vm.mode = "Add";
            };

            vm.typeSelection.types = initTypes();
            var type = vm.typeSelection.types.filter(function (obj) {
                return obj.value == vm.editedToDoItem.type;
            });

            vm.typeSelection.selectedOption = type[0];
        }


        function initTypes() {
            return [
                { id: 1, value: 'Bug' },
                { id: 2, value: 'ChangeRequest' },
                { id: 3, value: 'Task' }
            ];
        };

        init();
    }]);