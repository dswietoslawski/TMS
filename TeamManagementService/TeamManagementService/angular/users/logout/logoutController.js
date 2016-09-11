
var app = angular.module('tmsApp');

app.controller('logoutController', ['$scope', 'userService', '$window', 'appService', function ($scope, userService, $window, appService) {
    var vm = this;

    vm.currentUser = $scope.hmCtrl.currentUser;

    $scope.logout = function () {
        userService.logout(vm.currentUser)
        .then(function () {
            appService.setLoginInfo(null);
            $window.location.reload();
        }, function (error) {
            $scope.userMsg = error;
        });
    }
}]);