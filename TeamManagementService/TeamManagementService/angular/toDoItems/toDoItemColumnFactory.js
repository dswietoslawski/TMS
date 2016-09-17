var app = angular.module('tmsApp');

app.factory('ItemColumn', function () {
    
    this.items = [];

    var ItemColumn = function () {
        this.items = [];
    }

    ItemColumn.prototype.setItems = function (items) {
        this.items = items;
    };

    ItemColumn.prototype.getItems = function () {
        return this.items;
    };

    ItemColumn.prototype.addItem = function (item) {
        this.items.push(item);
    };

    ItemColumn.prototype.clearItems = function () {
        this.items = [];
    }

    return ItemColumn;
});