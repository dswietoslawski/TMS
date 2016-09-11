var app = angular.module('tmsApp');

app.controller('loginController', ['$scope', '$window', 'userService', 'appService', function ($scope, $window, userService, appService) {
    $scope.loginPopover = {
        templateUrl: '../users/login/loginPopoverTemplate.html',
        title: 'Login',
        content:"Hello"
    };

    $scope.loginUser = {
        userName: "",
        password: ""
    };

    $scope.login = function (user) {
        var promise = userService.login(user);// get promise reload and pin the user as logged in if SUCCESS
        promise.then(function () {
            $window.location.reload();
        }, function (error) {
            $scope.userMsg = error;
        })// get a promise use login function if SUCCESS
    }
}]);