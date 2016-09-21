var app = angular.module('tmsApp');

app.controller('homeController', ['$scope', '$rootScope', 'projectService', 'appService', 'offCanvas', function ($scope, $rootScope, projectService, appService, offCanvas) {

    var vm = this;
    vm.currentUser = {};
    vm.currentProject = {};

    vm.sidebarOpened = false;

    vm.isLoggedIn = false;

    vm.onInit = function () {
        vm.currentUser = appService.getLoginInfo();
        vm.isLoggedIn = vm.currentUser !== null;
    };


    vm.toggleSidebar = function () {
        vm.toggle = offCanvas.toggle();
    }

    $rootScope.$on('selected-project-changed', function (event, args) {
        vm.currentProject = args;
    });
}]);