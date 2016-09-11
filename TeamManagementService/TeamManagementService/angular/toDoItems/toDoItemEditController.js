var app = angular.module('tmsApp');

app.controller('toDoItemEditController', ['$scope', '$rootScope', 'toDoItemService', 'appService', 'toDoItem', function ($scope, $rootScope, toDoItemService, appService, toDoItem) {

    var vm = this;
    $scope.toDoItem = toDoItem;


}]);