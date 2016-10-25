var app = angular.module('tmsApp');

app.controller('projectController', ['$scope', '$rootScope', 'projectService', 'appService', 'modalService',
    function ($scope, $rootScope, projectService, appService, modalService) {

    var vm = this;

    vm.newProject = {
        name: "",
        adminId: 0
    }

    vm.projects = {};
    vm.projects.selected = {};
    vm.projects.items = [];
    vm.projects.isOpen = false;

    var init = function () {
        vm.projects = {};
        vm.projects.selected = {};

        projectService.get(appService.getLoginInfo().id).then(function (response) {
            vm.projects.items = response;
            if (vm.projects.items.length !== 0) {
                var selectedFromCache = appService.getProjectInfo();
                if (selectedFromCache !== undefined) vm.projects.selected = selectedFromCache;
                else 
                    vm.projects.selected = vm.projects.items[0];
                vm.update();
            }
        }).then(function (error) {

        });
    }

    if ($scope.hmCtrl.isLoggedIn) init();

    vm.update = function () {
        appService.setProjectInfo(vm.projects.selected)
        $rootScope.$broadcast('selected-project-changed', vm.projects.selected);
    }

    vm.delete = function () {
        var modalOptions = {
            closeButtonText: 'No',
            actionButtonText: 'Yes',
            headerText: 'Delete project "' + vm.projects.selected.name + '"?',
            bodyText: 'Are you sure you want to delete this project?'
        };

        modalService.showModal({}, modalOptions)
        .then(function (result) {
            //projectService.delete(vm.projects.selected.id);
            removeByAttr(vm.projects.items, 'id', vm.projects.selected.id);
            vm.projects.selected = vm.projects.items[0];
            vm.update();
        });
    }


    var removeByAttr = function (arr, attr, value) {
        var i = arr.length;
        while (i--) {
            if (arr[i]
                && arr[i].hasOwnProperty(attr)
                && (arguments.length > 2 && arr[i][attr] === value)) {

                arr.splice(i, 1);

            }
        }
        return arr;
    }

    $rootScope.$on('project-added', function (event, args) {
        vm.projects.items.push(args);
        vm.projects.selected = args;
        vm.update();
    });
}]);