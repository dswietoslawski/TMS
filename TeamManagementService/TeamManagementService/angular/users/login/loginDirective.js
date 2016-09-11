var app = angular.module('tmsApp');

app.directive('loginButton', function () {
    return {
        templateUrl: function() {
            return '../users/login/loginView.html';
        },
        restrict: 'A',
        controller: 'loginController'
    }
});