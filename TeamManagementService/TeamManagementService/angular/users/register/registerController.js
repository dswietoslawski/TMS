var app = angular.module('tmsApp');

app.controller('registerController', ['$scope', '$window', 'userService', 'appService', '$uibModal', function ($scope, $window, userService, appService, $uibModal) {
    $scope.open = function (size) {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '../users/register/registerModal.html',
            controller: 'registerModalController',
            controllerAs:'registerModalCtrl',
            size: size,
            resolve: {
                items: function () {

                }
            }
        });

    };
}]);