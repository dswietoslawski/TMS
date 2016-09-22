var app = angular.module('tmsApp', ['LocalStorageModule', 'ngAnimate', 'ngSanitize','ngAria', 'ngMaterial', 'ngMessages', 'ui.bootstrap', 'ui.sortable', 'ngTouch', 'cn.offCanvas']);

app.config(function ($animateProvider) {
    $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
})


app.factory('offCanvas', function (cnOffCanvas) {
    return cnOffCanvas({
        controller: 'sidebarController',
        controllerAs: 'sidebar',
        container: 'h4',
        containerClass: 'col-md-2 sidebarright',
        templateUrl: '../sidebarMenu/sidebarMenu.html'
    })
});