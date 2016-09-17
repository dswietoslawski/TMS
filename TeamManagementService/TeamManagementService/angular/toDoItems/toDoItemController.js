var app = angular.module('tmsApp');

app.controller('toDoItemController', ['$scope', '$rootScope', 'toDoItemService', 'appService', 'ItemColumn', 'ToDoItem',
    function ($scope, $rootScope, toDoItemService, appService, ItemColumn, ToDoItem) {

    var vm = this;
    init();

    //-- init
    function init() {
        vm.toDoItems = new ItemColumn();
        vm.inProgressItems = new ItemColumn();
        vm.doneItems = new ItemColumn();

        toDoItemService.getByTeam(1).then(function (items) {
            initializeToDoItems(items);
        });
    };

    var getByTeam = function (project) {
        toDoItemService.getByTeam(project.id).then(function (items) {
            initializeToDoItems(items);
        });
    };
    //!-- init

    //-- sortable
    vm.sortableOptions = {
        connectWith: '.connectedSortable',
        start: function (event, ui) {
            ui.item.toggleClass("note-highlight");
        },
        placeholder: 'note-placeholder',
        dropOnEmpty: true,
        update: function (e, ui) {
            if (ui.item.sortable.received && ui.item.sortable.source[0] !== ui.item.sortable.droptarget[0]) {
                updateStatus(ui.item.sortable.droptarget[0].id, ui.item.sortable.model, ui.item.sortable.sourceModel)
            }
        },
    };

    var updateStatus = function (id, item, sourceTable) {
        if (id === 'to-do-column') {
            item.status = 'ToDo'
        } else if (id === 'in-progress-column') {
            item.status = 'InProgress'
        } else if (id === 'done-column') {
            item.status = 'Done'
        }
        toDoItemService.update(toDoItem.copy());
        $scope.$apply();
    };

    //!-- sortable

    //--initialize items
    var initializeToDoItems = function (items) {
        angular.forEach(items, function (item) {
            getColumn(item.status).addItem(new ToDoItem(item));
        });
    };

    var getColumn = function (columnName) {
        if (columnName == 'ToDo')
            return vm.toDoItems;
        else if (columnName = 'InProgress')
            return vm.inProgressItems;
        else
            return vm.doneItems;
    }
    //-- initialize items

    vm.edit = function (item) {
        item.edit();
    };

    $scope.$on('selected-project-changed', function (event, args) {
        getByTeam(args);
    });

}]);