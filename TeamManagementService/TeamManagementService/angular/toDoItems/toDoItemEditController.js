var app = angular.module('tmsApp');

app.controller('toDoItemEditController', ['$scope', '$rootScope', 'toDoItemService', 'userService', 'appService', 'toDoItem', '$uibModalInstance',
    function ($scope, $rootScope, toDoItemService, userService, appService, toDoItem, $uibModalInstance) {

        var vm = this;

        vm.toDoItem = toDoItem;
        vm.errorMessage = "";
        vm.teamUsers = [];
        vm.editedToDoItem = {};

        vm.userSelection = {
            users: [],
            selectedOption: {}
        };

        vm.close = function () {
            $uibModalInstance.close(vm.toDoItem);
        };

        vm.save = function () {
            var promise = toDoItemService.update(convertToUpdateable(vm.editedToDoItem));
            promise.then(function () {
                vm.toDoItem = promise.$$state.value;
            }, function (error) {
                vm.errorMessage = "Couldn't update item";
            })// get a promise use login function if SUCCESS
        }

        function convertToUpdateable(from) {
            var newItem = {};
            newItem.description = from.description;
            newItem.id = from.id;
            newItem.teamId = from.team.id;
            newItem.name = from.name;
            newItem.type = from.type;
            newItem.status = from.status;
            newItem.userId = vm.userSelection.selectedOption.id;

            return newItem;
        }

        function copy(to, from) {
            to.description = from.description;
            to.id = from.id;
            to.team = from.team;
            to.name = from.name;
            to.type = from.type;
            to.status = from.status;
            to.user = from.user;
        };

        function init() {
            copy(vm.editedToDoItem, vm.toDoItem);
            var promise = userService.getByTeam(vm.toDoItem.team.id);
            promise.then(function () {
                vm.userSelection.users = promise.$$state.value;
                vm.userSelection.selectedOption = vm.toDoItem.user;
            });
        }

        init();

    }]);