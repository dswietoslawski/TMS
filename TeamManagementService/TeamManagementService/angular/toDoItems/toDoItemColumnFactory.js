var app = angular.module('tmsApp');

app.factory('ItemColumn', ['ToDoItem', function (ToDoItem) {
    var instance = this;

    this.items = [];

    var ItemColumn = function (toDoItems) {
        this.items = [];
        angular.forEach(toDoItems, function (item) {
            this.items.push(new ToDoItem(item));
        }, this);
    }

    ItemColumn.prototype.setItems = function (items) {
        instance.items = items;
    };

    ItemColumn.prototype.getItems = function () {
        return instance.items;
    };

    ItemColumn.prototype.addItem = function (item) {
        instance.items.push(item);
    };

    ItemColumn.prototype.clearItems = function () {
        instance.items = [];
    }

    ItemColumn.prototype.remove = function (item) {
        var index = instance.items.indexOf(item);
        instance.items.splice(index, 1);
    }

    return ItemColumn;
}]);