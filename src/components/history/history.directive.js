(function () {
    'use strict';

    angular
        .module('app.history')
        .directive('fcHistory', directiveFunction)
        .controller('HistoryController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/history/history.html',
            scope: {
            },
            controller: 'HistoryController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$mdSidenav'];

    /* @ngInject */
    function ControllerFunction($mdSidenav) {

        var vm = this;
        
        vm.toggleSidenav = toggleSidenav;

        activate();

        function activate() {
            console.log('inside history');
        }
        
        // function toggleSidenav() {
        //     $mdSidenav('left').toggle();
        // }
    }

})();
