var app = angular.module('tmsApp');

app.controller('registerModalController', ['$scope', '$window', 'userService', 'appService', '$uibModalInstance', '$rootScope', function ($scope, $window, userService, appService, $uibModalInstance, $rootScope) {
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
                $rootScope.$broadcast('register-succesful');
            },
            function (error) {
                vm.userExists = error;
            });// get a promise use login function if SUCCESS
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss({ $value: 'cancel' });
    };
}]);