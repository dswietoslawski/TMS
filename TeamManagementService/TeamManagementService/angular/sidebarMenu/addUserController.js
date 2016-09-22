var app = angular.module('tmsApp');

app.controller('addUserController', ['$scope', 'userService', 'User', '$timeout', '$q', '$uibModalInstance', 'projectService', 'appService',
    function ($scope, userService, User, $timeout, $q, $uibModalInstance, projectService, appService) {
        var vm = this;

        vm.filterOptions = {
            options: [
                   { id: 1, value: "All" },
                   { id: 2, value: "Added" },
                   { id: 3, value: "Not added" }
            ],
            selected: { id: 1, value: "All" }
        };

        vm.allUsers = [];
        vm.currentPage = 1;
        vm.itemsPerPage = 4;

        vm.filterText = "";

        init();

        vm.filterUsers = function () {
            vm.filteredUsers = filterWithType(vm.allUsers);
            vm.filteredUsers = filterWithText(vm.filteredUsers);
            refreshUsers();
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(user) {
                return (angular.lowercase(user.userName).indexOf(lowercaseQuery) === 0);
            };
        };
        function filterWithType (users) {
            return vm.filterOptions.selected.id != 1 ? users.filter(createTypeFilterFor(vm.filterOptions.selected)) : users;
        }

        function filterWithText (users) {
            return vm.filterText ? users.filter(createFilterFor(vm.filterText)) : users;
        }


        function createTypeFilterFor(option) {
            if (option.id == 2) {
                return function filterFn(user) {
                    return user.isInTeam;
                }
            }
            else if (option.id == 3) {
                return function filterFn(user) {
                    return !user.isInTeam;
                }
            }
        }

        vm.editedProject = appService.getProjectInfo();
        vm.close = function () {
            $uibModalInstance.close();
        };

        function init() {
            var promise = userService.get();


            promise.then(function (value) {
                vm.allUsers = value;
                vm.filteredUsers = vm.allUsers;
                refreshUsers();

                var promise2 = userService.getByTeam(vm.editedProject.id);
                promise2.then(function (value2) {
                    vm.usersInTeam = value2;
                    angular.forEach(vm.allUsers, function (user) {
                        user.isInTeam = vm.usersInTeam.filter(function (e) { return e.id == user.id }).length > 0;
                    });
                });
            });
        };

        vm.changePage = function () {
            refreshUsers();
        };

        var refreshUsers = function () {
            var from = (vm.currentPage - 1) * vm.itemsPerPage;
            var to = vm.itemsPerPage * vm.currentPage;
            vm.shownUsers = vm.filteredUsers.slice(from, to);
            vm.totalItems = vm.filteredUsers.length;
        };

        vm.edit = function (user) {
            user.isInTeam = !user.isInTeam;

            if (user.isInTeam)
                projectService.addUser(vm.editedProject.id, user.id);
            else
                projectService.deleteUser(vm.editedProject.id, user.id);
        };
    }]);