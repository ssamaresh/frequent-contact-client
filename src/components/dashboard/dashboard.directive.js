(function () {

    'use strict';

    angular.module('app.dashboard')
        .directive('fcDashboard', directiveFunction)
        .controller('DashboardController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/dashboard/dashboard.html',
            scope: {
            },
            controller: 'DashboardController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = [ 'contactService', 'peopleService' , '$stateParams', '$state', '$scope', '$rootScope', '$timeout'];

    /* @ngInject */
    function ControllerFunction ( contactService, peopleService, $stateParams, $state, $scope, $rootScope, $timeout ) {

        var vm = this;

        vm.contacts = [];
        vm.newContact = {};
        vm.date = new Date();

        vm.sortorder = 'Last Name';
        
        vm.sort = $stateParams.sort;
        
        vm.sortOptions = [
          "firstName",
          "lastName"
        ];

        activate();

        function activate() {

            // getContacts();

            // vm.newContact = contactService.getNewContactCreated();
            // vm.createContactSuccess = vm.newContact[1];
            
            // $timeout(function () {
            //     vm.createContactSuccess = false;
            // }, 5000);            

        }

        $rootScope.$on("createContactSuccess", function (event) {
            
            vm.newContact = contactService.getNewContactCreated();
            console.log(vm.newContact);
            vm.createContactSuccess = vm.newContact[1];

        });

        vm.sortChanged = function() {
            console.log('inside', vm.sort);
            console.log($state.go);
            $state.go('.', {sort: vm.sort});
        }

        function getContacts () {
            peopleService.getContacts('edana@sapient.com').then( function ( contacts ) {

                vm.contacts = contacts;

                console.log(vm.contacts);       

            });
        }

    }

})();
