var app = angular.module('tmsApp');

app.controller('userController', ['$scope', 'userService', 'appService', function ($scope, userService, appService) {
    $scope.registerUser = {
        userName: "",
        password: "",
        confirmPassword: "",
        email: "",
        firstName: "",
        lastName: ""
    };

    $scope.loginUser = {
        userName: "",
        password: "",
        rememberMe: true
    };

    $scope.currentUser = {
        userName: ""
    };

    $scope.userMsg = "";

    $scope.register = function (user) {
        userService.register(user)
            .then(function (response) {
                $scope.userMsg = response;
            },
            function (error) {
                $scope.userMsg = error;
            });// get a promise use login function if SUCCESS
    };

    $scope.login = function (user) {
        var promise = userService.login(user);// get promise reload and pin the user as logged in if SUCCESS
        promise.then(function () {
            $scope.currentUser = appService.getLoginInfo();
        }, function (error) {
            $scope.userMsg = error;
        })// get a promise use login function if SUCCESS
    }

    $scope.logout = function (user) {
        userService.logout(user)
        .then(function () {
            appService.setLoginInfo(null);
            $scope.currentUser = appService.currentUser;
        }, function (error) {
            $scope.userMsg = error;
        });
    }

    $scope.onInit = function () {
        $scope.currentUser = appService.getLoginInfo();
    }
}]);