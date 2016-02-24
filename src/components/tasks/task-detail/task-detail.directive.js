(function () {

    'use strict';

    angular.module('app.tasks')
        .directive('fcTaskDetail', directiveFunction)
        .controller('TaskDetailController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/tasks/task-detail/task-detail.html',
            scope: {
                task: '='
            },
            link: link,
            controller: 'TaskDetailController',
            controllerAs: 'taskDetail'
        };

        return directive;
    }

    var link = function(scope, element, attrs) {

        scope.getPhoto = function(contact) {

            var person = _.find(scope.task[1].people, {'email': contact});

            scope.task.person.picture = person.picture ? person.picture : 'src/images/user-icon-placeholder.png';

            return person.picture ? person.picture : 'src/images/user-icon-placeholder.png';
        
        }

        scope.getName = function(contact) {

            var person = _.find(scope.task[1].people, {'email': contact});

            return person.firstName + ' ' + person.lastName;
        }

        scope.getCompanyName = function(contact) {

            var person = _.find(scope.task[1].people, {'email': contact});

            var company = _.find(scope.task[1].companies, {'id': person.company});

            return company.name; 
        }

        scope.getPersonTitle = function(contact) {
            
            var person = _.find(scope.task[1].people, {'email': contact});

            return person.title; 
        }

        scope.getPrimaryOwner = function(primaryOwner) {

            var primaryOwner = _.find(scope.task[1].people, {'email': primaryOwner});

            scope.primaryOwner = primaryOwner.firstName + ' ' + primaryOwner.lastName;
        
            return scope.primaryOwner; 
        
        }

        scope.getSecondaryOwner = function(secondaryOwner) {

            var secondaryOwner = _.find(scope.task[1].people, {'email': secondaryOwner});

            return secondaryOwner.firstName + ' ' + secondaryOwner.lastName; 
        }

        scope.calculateDueDateFormatted = function(dueDate) {

            return moment(dueDate).format('l');
        }

        scope.calculateDueDate = function(dueDate) {

            var dueOn = null;
            var dueDate;

            var dueTypes = ['Overdue', 'Today', 'Upcoming'];
            var diffDays = moment().diff(moment(dueDate), 'days');
    
            if(diffDays > 0) { 
                dueOn = dueTypes[0];
                dueDate = diffDays;
                return dueDate + ' days';
            } 

            else if(diffDays === 0) {
                dueOn = dueTypes[1];
                dueDate = 0;
                return 'Today';
            }

            else { 
                dueOn = dueTypes[2];
                dueDate = Math.abs(diffDays);
                return dueDate + ' days left';
            }
        }
    }

    //----- ControllerFunction -----
    ControllerFunction.$inject = [ 'taskService', '$state', '$scope'];

    /* @ngInject */
    function ControllerFunction ( taskService, $state, $scope ) {

         
    }

})();
