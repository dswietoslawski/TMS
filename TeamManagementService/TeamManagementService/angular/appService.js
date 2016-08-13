var app = angular.module('tmsApp');

app.service('appService', function ($window, $rootScope) {

    this.setLoginInfo = function (user) {
        $window.localStorage && window.localStorage.setItem('userInfo', user);
    }
    this.getLoginInfo = function () {
        $window.localStorage && window.localStorage.getItem('userInfo');
    }

});