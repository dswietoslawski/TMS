﻿var app = angular.module('tmsApp');

app.controller('toDoItemController', ['$scope', '$rootScope', 'toDoItemService', 'appService', 'ItemColumn', 'ToDoItem', '$filter',
    function ($scope, $rootScope, toDoItemService, appService, ItemColumn, ToDoItem, $filter) {

        var vm = this;
        vm.columns = [];
        vm.hoverOnClose = false;

        vm.sortableOpt = {
            connectWith: '.connectedSortable',
            start: function (event, ui) {
                ui.item.toggleClass("note-highlight");
            },
            placeholder: 'note-placeholder',
            dropOnEmpty: true,
            receive: function (event, ui) {
                ui.item.sortable.model.update(ui.item.sortable.droptarget[0].id);
            },
            cancel: ".unsortable"
        }

        //-- init

        var getByTeam = function (project) {
            if (project !== null && project !== undefined) {
                toDoItemService.getByTeam(project.id).then(function (items) {
                    initializeToDoItems(items);
                }).then(function (error) {
                    var toDoItems = new ItemColumn([], { status: 'ToDo' }, "To Do", 1);
                    var inProgressItems = new ItemColumn([], { status: 'ToDo' }, "To Do", 1);
                    var doneItems = new ItemColumn([], { status: 'ToDo' }, "To Do", 1);
                });
            }
            else {
                var toDoItems = new ItemColumn([], "To Do", 1);
                var inProgressItems = new ItemColumn([], "In Progress", 2);
                var doneItems = new ItemColumn([], 'Done', 3);

                vm.columns = [];

                vm.columns.push(toDoItems);
                vm.columns.push(inProgressItems);
                vm.columns.push(doneItems);
            }
        };
        //!-- init

        //--initialize items

        var initializeToDoItems = function (items) {
            var toDoItems = new ItemColumn($filter('filter')(items, { status: 'ToDo' }), "To Do", 1);
            var inProgressItems = new ItemColumn($filter('filter')(items, { status: 'InProgress' }), "In Progress", 2);
            var doneItems = new ItemColumn($filter('filter')(items, { status: 'Done' }), 'Done', 3);
            vm.columns = [];

            vm.columns.push(toDoItems);
            vm.columns.push(inProgressItems);
            vm.columns.push(doneItems);
            if ($scope.hmCtrl.currentProject.admin.id === $scope.hmCtrl.currentUser.id)
                initializeEmptyItem();
        };
        //-- initialize items

        vm.edit = function (item) {
            item.edit();
        };

        $rootScope.$on('selected-project-changed', function (event, args) {
            vm.currentProject = args;
            getByTeam(args);
        });

        $rootScope.$on('item-added', function (event, args) {
            initializeEmptyItem();
        });

        function initializeEmptyItem() {
            var emptyItem = new ToDoItem();
            emptyItem.setTeam(vm.currentProject);
            vm.columns[0].addItemToBeginning(emptyItem);
        };

        vm.canDrag = function (item) {
            var canDrg = (item.status === undefined || (item.user.id === $scope.hmCtrl.currentUser.id || $scope.hmCtrl.currentUser.id === $scope.hmCtrl.currentProject.admin.id));
            return canDrg;
        };

        vm.canDelete = function (item) {
            var canDel = (item.status !== undefined && (item.team !== undefined && item.team.admin !== null && item.team.admin.id === $scope.hmCtrl.currentUser.id));
            return canDel;
        }

        vm.delete = function (item) {
            toDoItemService.delete(item.id, item.team.id);
            vm.columns[getColumnId(item.status)].remove(item);
        }
        function getColumnId(status) {
            if (status === 'ToDo')
                return 0;
            if (status === 'InProgress')
                return 1;
            return 2;
        }

    }]);