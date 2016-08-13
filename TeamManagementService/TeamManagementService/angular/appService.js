var app = angular.module('tmsApp');

app.service('appService',['localStorageService', function (localStorageService) {

    this.setLoginInfo = function (user) {
        localStorageService.set('userInfo', user);
    }
    this.getLoginInfo = function () {
        var keys = localStorageService.keys();
        return localStorageService.get('userInfo');
    }

}]);