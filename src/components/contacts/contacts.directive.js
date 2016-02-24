(function () {
    'use strict';

    angular
        .module('app.contacts')
        .directive('fcContacts', directiveFunction)
        .controller('ContactsController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/contacts/contacts.html',
            scope: true,
            controller: 'ContactsController',
            controllerAs: 'contacts'
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

        var vm = this;

        activate();

        function activate () {

        }


    }

})();
