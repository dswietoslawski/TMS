var app = angular.module('tmsApp');

app.directive('projectSelection', function () {
    return {
        templateUrl: function () {
            return '../teams/projectSelection.html';
        },
        restrict: 'E',
        controller: 'projectController',
        controllerAs: 'projectCtrl'
    }
});