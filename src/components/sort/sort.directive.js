(function () {
    'use strict';

    angular
        .module('app.sort')
        .directive('fcSort', directiveFunction)
        .controller('SortController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/sort/sort.html',
            scope: true,
            controller: 'SortController',
            controllerAs: 's'
        };

        return directive;
    }

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$stateParams', '$state', '$scope'];

    /* @ngInject */
    function ControllerFunction($stateParams, $state, $scope) {
        
        function sortList() {}

        var s = this;

        //s.sortorder = 'Last Name';

        sortList();

        s.sort = $stateParams.sort;
        
        s.sortOptions = [
          "firstName",
          "lastName"
        ];

      s.sortChanged = function() {
        console.log('inside');
        sortList();
        $state.go('.', {sort: s.sort}, {notify: false});

      }

    }

})();
