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
}]);