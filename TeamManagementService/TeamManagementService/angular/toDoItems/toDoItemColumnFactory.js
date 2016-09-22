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
        this.items = items;
    };

    ItemColumn.prototype.getItems = function () {
        return instance.items;
    };

    ItemColumn.prototype.addItem = function (item) {
        this.items.push(item);
    };

    ItemColumn.prototype.addItemToBeginning = function (item) {
        this.items.splice(0, 0, item);
    }

    ItemColumn.prototype.clearItems = function () {
        this.items = [];
    }

    ItemColumn.prototype.remove = function (item) {
        removeByAttr(this.items, 'id', item.id);
    }

    var removeByAttr = function(arr, attr, value){
        var i = arr.length;
        while(i--){
            if( arr[i] 
                && arr[i].hasOwnProperty(attr) 
                && (arguments.length > 2 && arr[i][attr] === value ) ){ 

                arr.splice(i,1);

            }
        }
        return arr;
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