var app = angular.module('tmsApp');

app.controller('userController', ['$scope', 'userService', 'appService', function ($scope, userService, appService) {
    $scope.registerUser = {
        userName: "asdf",
        password: "asdf",
        confirmPassword: "asdf",
        email: "asdf",
        firstName: "asdf",
        lastName: "asdf"
    };

    $scope.loginUser = {
        userName: "TestUser",
        password: "TestTest"
    };

    $scope.currentUser = {
        userName: ""
    };

    $scope.registerMsg = "";

    $scope.register = function (user) {
        userService.register(user)
            .then(function (response) {
                $scope.registerMsg = response;
            },
            function (error) {
                $scope.registerMsg = error;
            });// get a promise use login function if SUCCESS
    };

    $scope.login = function (user) {
        var promise = userService.login(user);// get promise reload and pin the user as logged in if SUCCESS
        promise.then(function () {
            $scope.currentUser = appService.currentUser;
        })// get a promise use login function if SUCCESS
    }

    $scope.logout = function (user) {
        userService.logout(user)
        .then(function () {
            $scope.currentUser = appService.currentUser;
        });
    }
}]);