var app = angular.module('tmsApp');

app.controller('registerModalController', ['$scope', '$window', 'userService', 'appService', '$uibModalInstance', function ($scope, $window, userService, appService, $uibModalInstance) {
    var vm = this;

    vm.registerUser = {
        userName: "",
        password: "",
        confirmPassword: "",
        email: "",
        firstName: "",
        lastName: ""
    };

    vm.register = function (user) {
        userService.register(user)
            .then(function (response) {
                $uibModalInstance.dismiss({ $value: 'cancel' });
            },
            function (error) {
                vm.userMsg = error;
            });// get a promise use login function if SUCCESS
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss({ $value: 'cancel' });
    };
}]);