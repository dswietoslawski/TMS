var app = angular.module('tmsApp');

app.factory('ToDoItem', ['$uibModal', 'toDoItemService', function ($uibModal, toDoItemService) {

    this.description = [];
    this.id = [];
    this.name = [];
    this.type = [];
    this.status = [];
    this.team = {};
    this.user = {};

    var ToDoItem = function (item) {
        if (item != undefined) {
            this.status = item.status;
            this.description = item.description;
            this.id = item.id;
            this.team = item.team;
            this.name = item.name;
            this.type = item.type;
            this.status = item.status;
            this.user = item.user;
        } else {
            this.id = 0;
        }
    }

    ToDoItem.prototype.setTeam = function (team) {
        this.team = team;
    }


    ToDoItem.prototype.setValues = function (from) {
        this.description = from.description;
        this.id = from.id;
        this.team = from.team;
        this.name = from.name;
        this.type = from.type;
        this.status = from.status;
        this.user = from.user;
    };


    ToDoItem.prototype.copy = function () {
        var newItem = this;
        newItem.description = this.description;
        newItem.id = this.id;
        newItem.name = this.name;
        newItem.type = this.type;
        newItem.status = this.status;

        return newItem;
    }

    ToDoItem.prototype.edit = function () {
        var instance = this;
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '../toDoItems/toDoItemModal.html',
            controller: 'toDoItemEditController',
            controllerAs: 'toDoItemEditCtrl',
            backdrop: 'static',
            resolve: {
                itemForEdit: function () {
                    return instance;
                }
            }
        });


        modalInstance.result.then(function (toDoItem) {
            instance.setValues(toDoItem);
        });
    };

    ToDoItem.prototype.update = function (id) {
        if (id === 'column-1') {
            this.status = 'ToDo'
        } else if (id === 'column-2') {
            this.status = 'InProgress'
        } else if (id === 'column-3') {
            this.status = 'Done'
        }
        toDoItemService.update(this.copy(), this.team.id, this.user.id);
    };


    return ToDoItem;
}]);