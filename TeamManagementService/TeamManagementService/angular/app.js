var app = angular.module('tmsApp', ['LocalStorageModule', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui.sortable']);

app.config(function ($animateProvider) {
    $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
})