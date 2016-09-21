var app = angular.module('tmsApp', ['LocalStorageModule', 'ngAnimate', 'ngSanitize','ngAria', 'ngMaterial', 'ngMessages', 'ui.bootstrap', 'ui.sortable', 'ngTouch', 'cn.offCanvas']);

app.config(function ($animateProvider) {
    $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
})


app.factory('offCanvas', function (cnOffCanvas) {
    return cnOffCanvas({
        controller: 'sidebarController',
        controllerAs: 'sidebar',
        templateUrl: '../sidebarMenu/sidebarMenu.html'
    })
});