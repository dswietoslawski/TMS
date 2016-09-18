var app = angular.module('tmsApp');

app.directive('sortable', function () {
    return {
        restrict: 'A',
        scope: {
            items: '='
        },
        link: function (scope, element, attributes) {
            element.sortable({
                connectWith: '.connectedSortable',
                start: function (event, ui) {
                    ui.item.toggleClass("note-highlight");
                },
                placeholder: 'note-placeholder',
                dropOnEmpty: true,
                receive: function (event, ui) {
                    var source = ui.sender;
                    var target = $(this);
                    scope.list = scope.$parent.$eval(attributes.items);
                    scope.item = scope.list.findById(ui.item[0].id);
                }
            });
        }
};
});