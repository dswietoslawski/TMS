var app = angular.module('tmsApp');

app.controller('toDoItemController', ['$scope', '$rootScope', 'toDoItemService', 'appService', function ($scope, $rootScope, toDoItemService, appService) {

    $scope.toDoItems = [];
    $scope.inProgressItems = [];
    $scope.doneItems = [];


    $scope.sortableOptions = {
        connectWith: '.connectedSortable',
        placeholder: 'placeholder',
        dropOnEmpty:true,
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
                $scope.toDoItems.push(value);
            }
            if (value.status === 'InProgress') {
                $scope.inProgressItems.push(value);
            }
            if (value.status === 'Done') {
                $scope.doneItems.push(value);
            }
        });
    };

    var clearItems = function () {
        $scope.toDoItems = [];
        $scope.inProgressItems = [];
        $scope.doneItems = [];
    }
}]);