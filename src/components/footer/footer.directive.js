(function () {
    'use strict';

    angular
        .module('app.footer')
        .directive('fcFooter', directiveFunction)
        .controller('FooterController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/footer/footer.html',
            scope: true,
            controller: 'FooterController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- ControllerFunction -----
    ControllerFunction.$inject = [];

    /* @ngInject */
    function ControllerFunction() {

        var vm = this;
        
        vm.createButton = "add";
        vm.isOpen = false;
        vm.selectedMode = 'md-fling';
        vm.selectedDirection = 'up';
        
        vm.toggleAction = function() {
            
            vm.isOpen = vm.isOpen ? false : true;
            vm.createButton = vm.isOpen ? "clear" : "add";
            
            console.log('vm.isOpen', vm.isOpen);
            
            
        }

    }

})();
