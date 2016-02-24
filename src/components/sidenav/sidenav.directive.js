(function () {

    'use strict';

    angular.module('app.sidenav')
        .directive('fcSidenav', directiveFunction)
        .controller('SidenavController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/sidenav/sidenav.html',
            scope: {
            },
            controller: 'SidenavController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = [ 'contactService', 'peopleService' , '$stateParams', '$state', '$scope', '$rootScope', '$timeout'];

    /* @ngInject */
    function ControllerFunction ( contactService, peopleService, $stateParams, $state, $scope, $rootScope, $timeout ) {

        var vm = this;

    }

})();
