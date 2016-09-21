var app = angular.module('tmsApp');

app.controller('toDoItemController', ['$scope', '$rootScope', 'toDoItemService', 'appService', 'ItemColumn', 'ToDoItem', '$filter',
    function ($scope, $rootScope, toDoItemService, appService, ItemColumn, ToDoItem, $filter) {

        var vm = this;
        vm.columns = [];

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
            toDoItemService.getByTeam(project.id).then(function (items) {
                initializeToDoItems(items);
            });
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
            return (item.status === undefined || !(item.user.id === $scope.hmCtrl.currentUser.id || $scope.hmCtrl.currentUser.id === $scope.hmCtrl.currentProject.admin.id));
        };

        vm.canDelete = function (item) {
            var canDel = (item.status !== undefined && ( item.team != undefined && item.team.admin != undefined && item.team.admin.id === $scope.hmCtrl.currentProject.admin.id));
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