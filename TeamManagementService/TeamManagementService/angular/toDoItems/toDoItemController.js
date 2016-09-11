var app = angular.module('tmsApp');

app.controller('toDoItemController', ['$scope', '$rootScope', 'toDoItemService', 'appService', '$uibModal', function ($scope, $rootScope, toDoItemService, appService, $uibModal) {

    var vm = this;

    vm.toDoItems = [];
    vm.inProgressItems = [];
    vm.doneItems = [];


    vm.sortableOptions = {
        connectWith: '.connectedSortable',
        placeholder: 'placeholder',
        dropOnEmpty: true,
        receive: function (e, ui) {
            updateStatus(e.target.id, ui.item.sortable.model)
        },
    };

    var updateStatus = function (id, item) {
        if (id === 'to-do-column') {
            item.status = 'ToDo'
        } else if (id === 'in-progress-column') {
            item.status = 'InProgress'
        } else if (id === 'done-column') {
            item.status = 'Done'
        }
        toDoItemService.update(item);
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
            resolve: {
                toDoItem: function () {
                    return item;
                }
            }
        });
    };
}]);