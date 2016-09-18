var app = angular.module('tmsApp');

app.factory('ItemColumn', ['ToDoItem', '$filter', function (ToDoItem, $filter) {
    var instance = this;

    this.items = [];
    this.title = [];
    this.id = 0;

    var ItemColumn = function (toDoItems, title, id) {
        this.items = [];
        angular.forEach(toDoItems, function (item) {
            this.items.push(new ToDoItem(item));
        }, this);
        this.title = title;
        this.id = id;
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

    ItemColumn.prototype.findById = function (itemId) {
        var item = $filter('filter')(this.items, { id: itemId })[0];
        if (item && item !== undefined)
            return item;
        else
            return null;
    }

    return ItemColumn;
}]);