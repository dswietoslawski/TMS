var app = angular.module('tmsApp');

app.directive('registerButton', function () {
    return {
        templateUrl: function () {
            return '../users/register/registerView.html';
        },
        restrict: 'A',
        controller: 'registerController'
    }
});