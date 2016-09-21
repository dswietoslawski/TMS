var app = angular.module('tmsApp');

app.factory('User', [function () {
    var User = function (user) {
        this.userName = user.userName;
        this.id = user.id;
    };

    return User;
}]);