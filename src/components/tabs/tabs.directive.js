(function () {
    'use strict';

    angular
        .module('app.tabs')
        .directive('fcTabs', directiveFunction)
        .controller('TabsController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/tabs/tabs.html',
            scope: {
            },
            controller: 'TabsController',
            controllerAs: 'tabs'
        };

        return directive;
    }

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$scope', '$log'];

    /* @ngInject */
    function ControllerFunction($scope, $log) {

        var tabs = this;

        var tabList = [
            {title: '<i class="material-icons">people</i>', link: 'dashboard'},
            {title: 'Tasks', link: 'tasks'},
            {title: 'Completed', link: 'completed'}
        ];

        var selected = null;
        var previous = null;

        tabs.tabList = tabList;

        tabs.selectedIndex = 0;

        activate();

        $scope.$watch('tabs.selectedIndex', function(current, old){
            
            previous = selected;
            selected = tabList[current];
            
            // if ( old + 1 && (old != current)) { 
            //     console.log(tabs.selectedIndex);
            // }

            // if ( current + 1 ) {
            //      console.log(tabs.selectedIndex);
            // }
        
        });

        function activate() {
            console.log("inside tabs");
        }

        tabs.addTab = function (title, view) {
            view = view || title + " Content View";
            tabs.tabList.push({ title: title, disabled: false});
        };

        tabs.removeTab = function (tab) {
            var index = tabs.tabList.indexOf(tab);
            tabs.tabList.splice(index, 1);
        }

    }

})();
