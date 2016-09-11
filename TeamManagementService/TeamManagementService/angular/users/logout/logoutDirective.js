var app = angular.module('tmsApp');

app.directive('logoutButton', function () {
    return {
        templateUrl: function () {
            return '../users/logout/logoutView.html';
        },
        restrict: 'A',
        controller: 'logoutController'
    }
});