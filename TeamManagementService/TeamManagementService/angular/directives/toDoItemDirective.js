var app = angular.module('tmsApp');

app.directive('toDoItem', function () {
    return {
        templateUrl: function() {
            return '../directives/toDoItem.html';
        }
    }
});