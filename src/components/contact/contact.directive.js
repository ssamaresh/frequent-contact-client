(function () {
    'use strict';

    angular
        .module('app.contact')
        .directive('fcContact', directiveFunction)
        .controller('ContactController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/contact/contact.html',
            scope: true,
            controller: 'ContactController',
            controllerAs: 'contact'
        };
        return directive;
    }

    // ----- ControllerFunction -----
    ControllerFunction.$inject = [
        'peopleService',
        'lookupService',
        '$scope'
    ];

    /* @ngInject */
    function ControllerFunction(
        peopleService,
        lookupService,
        $scope
        ) {

        var contact = this;

        activate();

        function activate () {

        }


    }

})();
