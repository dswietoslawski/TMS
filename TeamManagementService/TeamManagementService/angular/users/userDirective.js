var app = angular.module('tmsApp');

app.directive('user', function () {
    return {
        templateUrl: '../users/userView.html',
        restrict: 'E'
    }
});