var app = angular.module('tmsApp');

app.service('appService',['localStorageService', function (localStorageService) {

    this.setLoginInfo = function (user) {
        localStorageService.set('userInfo', user);
    }
    this.getLoginInfo = function () {
        var login = localStorageService.get('userInfo');
        return localStorageService.get('userInfo');
    }

    this.setProjectInfo = function (project) {
        var login = this.getLoginInfo();
        localStorageService.set('projectInfo' + login.id, project);
    };

    this.getProjectInfo = function () {
        var login = this.getLoginInfo();
        var project = localStorageService.get('projectInfo' + login.id);
        return localStorageService.get('projectInfo' + login.id);
    }
}]);