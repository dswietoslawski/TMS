var app = angular.module('tmsApp');

app.directive('sidebarMenu', function () {
    return {
        templateUrl: function () {
            return "../sidebarMenu/sidebarMenu.html";
        },
        restrict: 'E',
        controller: 'sidebarController',
        controllerAs: 'sidebar'
    }
});