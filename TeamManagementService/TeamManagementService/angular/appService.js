var app = angular.module('tmsApp');

app.service('appService', function () {

    this.currentUser = {
        userName: "",
        id: ""
    };

    this.login = function (user) {
        this.currentUser.userName = user.userName;
        this.currentUser.id = user.id;
    }

});