var app = angular.module('tmsApp');

app.controller('loginController', ['$scope', '$window', 'userService', 'appService', '$rootScope' , function ($scope, $window, userService, appService, $rootScope) {

    vm = this;
    vm.loginPopover = {
        templateUrl: '../users/login/loginPopoverTemplate.html',
        title: 'Login',
        content:"Hello"
    };

    vm.loginUser = {
        userName: "",
        password: ""
    };

    vm.invalidCredentials = false;
    vm.registerSuccesful = false;

    vm.login = function (user) {
        var promise = userService.login(user);// get promise reload and pin the user as logged in if SUCCESS
        promise.then(function () {
            $window.location.reload();
        }, function (error) {
            $scope.invalidCredentials = true;
            $scope.registerSuccesful = false;
        })// get a promise use login function if SUCCESS
    }

    $rootScope.$on('register-succesful', function () {
        $scope.registerSuccesful = true;
        $scope.invalidCredentials = false;
    });
}]);