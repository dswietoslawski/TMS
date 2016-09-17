var app = angular.module('tmsApp');

app.controller('toDoItemController', ['$scope', '$rootScope', 'toDoItemService', 'appService', '$uibModal', function ($scope, $rootScope, toDoItemService, appService, $uibModal) {

    var vm = this;

    vm.toDoItems = [];
    vm.inProgressItems = [];
    vm.doneItems = [];

    vm.sortableOptions = {
        connectWith: '.connectedSortable',
        start: function (event, ui) {
            ui.item.toggleClass("note-highlight");
        },
        placeholder: 'note-placeholder',
        dropOnEmpty: true,
        update: function (e, ui) {
            if(ui.item.sortable.received && ui.item.sortable.source[0] !== ui.item.sortable.droptarget[0]){
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
        toDoItemService.update(toDoItemCopy(item));
        $scope.$apply();
    };

    $scope.$on('selected-project-changed', function (event, args) {
        getByTeam(args);
    });

    var init = function () {
        toDoItemService.getByTeam(1).then(function (items) {
            initializeToDoItems(items);
        });
    };

    init();


    var getByTeamUser = function (project) {
        toDoItemService.getByTeamUser(project.id, appService.getLoginInfo().id)
        .then(function (items) {
            initializeToDoItems(items);
        });
    };

    var getByTeam = function (project) {
        toDoItemService.getByTeam(project.id).then(function (items) {
            initializeToDoItems(items);
        });
    };

    var initializeToDoItems = function (items) {
        clearItems();
        angular.forEach(items, function (value) {
            if (value.status === 'ToDo') {
                vm.toDoItems.push(value);
            }
            if (value.status === 'InProgress') {
                vm.inProgressItems.push(value);
            }
            if (value.status === 'Done') {
                vm.doneItems.push(value);
            }
        });
    };

    var clearItems = function () {
        vm.toDoItems = [];
        vm.inProgressItems = [];
        vm.doneItems = [];
    }

    vm.edit = function (item) {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '../toDoItems/toDoItemModal.html',
            controller: 'toDoItemEditController',
            controllerAs: 'toDoItemEditCtrl',
            backdrop: 'static',
            resolve: {
                toDoItem: function () {
                    return item;
                }
            }
        });

        modalInstance.result.then(function (toDoItem) {
            update(item, toDoItem);
        });
    };

    function update(to, from) {
        to.description = from.description;
        to.id = from.id;
        to.team = from.team;
        to.name = from.name;
        to.type = from.type;
        to.status = from.status;
        to.user = from.user;
    };

    function toDoItemCopy(from) {
        var newItem = {};
        newItem.description = from.description;
        newItem.id = from.id;
        newItem.teamId = from.team.id;
        newItem.name = from.name;
        newItem.type = from.type;
        newItem.status = from.status;
        newItem.userId = from.user.id;

        return newItem;
    }

}]);