(function () {

    'use strict';

    angular.module('app.tasks')
        .directive('fcTasks', directiveFunction)
        .controller('TasksController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/tasks/tasks.html',
            scope: {
            },
            controller: 'TasksController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = [ 'logger', 'taskService', '$scope'];

    /* @ngInject */
    function ControllerFunction ( logger, taskService, $scope ) {

        var vm = this;
        vm.tasks = [];

        activate();

        function activate() {
        
            return getTasks().then(function() {
                logger.log('Activated Tasks View');
            });

        }

        function getTasks() {

            return taskService.getTasks().then( function ( data ) {

                vm.tasks = data;
                //$scope.$broadcast('getTasks', vm.tasks);
                return vm.tasks;
                

            });
        }

    }

})();
