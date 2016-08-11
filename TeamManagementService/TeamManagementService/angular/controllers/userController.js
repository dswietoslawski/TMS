var app = angular.module('tmsApp');

app.controller('userController', ['$scope', 'userService', function ($scope, userService) {
    $scope.registerUser = {
        UserName: "asdf",
        Password: "asdf",
        ConfirmPassword: "asdf",
        Email: "asdf",
        FirstName: "asdf",
        LastName: "asdf"
    }

    $scope.loginUser = {
        UserName: "",
        Password: ""
    }

    $scope.register = function (user) {
        userService.register(user); // get a promise use login function if SUCCESS
    };

    $scope.login = function (user) {
        userService.login(user); // get promise reload and pin the user as logged in if SUCCESS
    }

    $scope.logout = function (user) {
        userService.logout(user);
    }
}]);