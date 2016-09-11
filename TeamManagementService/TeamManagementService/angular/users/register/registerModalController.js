var app = angular.module('tmsApp');

app.controller('registerModalController', ['$scope', '$window', 'userService', 'appService', '$uibModalInstance', function ($scope, $window, userService, appService, $uibModalInstance) {
    var vm = this;

    $scope.registerUser = {
        userName: "",
        password: "",
        confirmPassword: "",
        email: "",
        firstName: "",
        lastName: ""
    };

    $scope.register = function (user) {
        userService.register(user)
            .then(function (response) {
                $uibModalInstance.dismiss({ $value: 'cancel' });
            },
            function (error) {
                $scope.userMsg = error;
            });// get a promise use login function if SUCCESS
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss({ $value: 'cancel' });
    };
}]);