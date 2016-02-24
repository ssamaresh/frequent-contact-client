(function () {

    'use strict';

    angular.module('app.tasks')
        .directive('fcTaskList', directiveFunction);
        // .controller('TaskListController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/tasks/task-list/task-list.html',
            scope: {
                tasks: '='
            },
            link: link
            // controller: 'TaskListController',
            // controllerAs: 'vm'
        }

        return directive;
    }

    var link = function(scope, element, attrs){  

        scope.task = {
            taskInfo: {},
            person: {}
        };

        scope.getPhoto = function(contact) {

            var person = _.find(scope.tasks[1].people, {'email': contact});

            scope.task.person.picture = person.picture ? person.picture : 'src/images/user-icon-placeholder.png';

            return person.picture ? person.picture : 'src/images/user-icon-placeholder.png';
        }

        scope.getName = function(contact) {

            var person = _.find(scope.tasks[1].people, {'email': contact});

            scope.task.person.firstName = person.firstName;
            scope.task.person.lastName = person.lastName;

            return person.firstName + ' ' + person.lastName;
        }

        scope.getCompanyName = function(contact) {

            var person = _.find(scope.tasks[1].people, {'email': contact});
            var company = _.find(scope.tasks[1].companies, {'id': person.company});

            scope.task.person.company = company.name;

            return company.name; 
        }

        scope.getPersonTitle = function(contact) {
            
            var person = _.find(scope.tasks[1].people, {'email': contact});

            scope.task.person.title = person.title;

            return person.title; 
        }

        scope.getPrimaryOwner = function(primaryOwner) {

            var primaryOwner = _.find(scope.tasks[1].people, {'email': primaryOwner});

            scope.task.person.PrimaryOwner.firstName = primaryOwner.firstName;
            scope.task.person.PrimaryOwner.lastName = primaryOwner.lastName;

            return primaryOwner.firstName + ' ' + primaryOwner.lastName; 
        }

        scope.getSecondaryOwner = function(secondaryOwner) {

            var secondaryOwner = _.find(scope.tasks[1].people, {'email': secondaryOwner});

            scope.task.person.secondaryOwner.firstName = secondaryOwner.firstName;
            scope.task.person.secondaryOwner.lastName = secondaryOwner.lastName;

            return secondaryOwner.firstName + ' ' + secondaryOwner.lastName; 
        }

        scope.calculateDueDate = function(dueDate) {

            var dueOn = null;
            var dueDate;

            scope.task.dueDateFormatted = moment(dueDate).format('l');

            var dueTypes = ['Overdue', 'Today', 'Upcoming'];
            var diffDays = moment().diff(moment(dueDate), 'days');
    
            if(diffDays > 0) { 
                dueOn = dueTypes[0];
                dueDate = diffDays;
                scope.task.dueDate = dueDate + 'days';
                return dueDate + ' days';
            } 

            else if(diffDays === 0) {
                dueOn = dueTypes[1];
                dueDate = 0;
                scope.task.dueDate = 'Today';
                return 'Today';
            }

            else { 
                dueOn = dueTypes[2];
                dueDate = Math.abs(diffDays);
                scope.task.dueDate = dueDate + 'days left';
                return dueDate + ' days left';
            }
        }
    }

    // ControllerFunction.$inject = [ '$stateParams', '$state', '$scope', '_', 'moment'];

    // /* @ngInject */
    // function ControllerFunction ( $stateParams, $state, $scope, _, moment) {
            
    //         var vm = this;

    //          $scope.$on('getTasks', function(event, tasks) {
                
    //            console.log('tasks', tasks);

    //             vm.taskList = tasks[0];
    //             vm.companies = tasks[1].companies
    //             vm.people = tasks[1].people;

    //         });

    //     //Get corresponsing person object 
    //     vm.getName = function(contact) {
            
    //         console.log('contact', contact);
    //         console.log('vm.people', vm.people);
    //         for(var i = 0; i < vm.people.length; i++) {
               
    //             if(contact === vm.people[i].email) {
                    
    //                 return vm.people[i].firstName + ' ' + vm.people[i].lastName; 
                
    //             }
    //         }
    //     }

    //     vm.getCompanyInfo = function(contact) {

    //         for(var i = 0; i < vm.people.length; i++) {
               
    //             if(contact === vm.people[i].email) {
                    
    //                 return vm.people[i].company + ' ' + vm.people[i].title; 
                
    //             }
    //         }
    //     }

    //     vm.getPhoto = function(contact) {

    //         for(var i = 0; i < vm.people.length; i++) {
               
    //             if(contact === vm.people[i].email) {
                    
    //                 return vm.people[i].picture ? vm.people[i].picture : 'src/images/user-icon-placeholder.png'
                
    //             }
    //         }
    //     }

    //     vm.calculateDueDate = function(dueDate) {
            
    //         vm.dueOn = null;
    //         vm.dueDate = null;
    //         var dueTypes = ['Overdue', 'Today', 'Upcoming'];
    //         var diffDays = moment().diff(moment(dueDate), 'days');
            
    //         if(diffDays > 0) {
                
    //             vm.dueOn = dueTypes[0];
    //             vm.dueDate = diffDays;
    //             return vm.dueDate + ' days';             

    //         } 

    //         else if(diffDays === 0) {

    //             vm.dueOn = dueTypes[1];
    //             vm.dueDate = 0;
    //             return 'Today'; 

    //         }

    //         else {
                
    //             vm.dueOn = dueTypes[2];
    //             vm.dueDate = diffDays;
    //             return vm.dueDate + ' days left';
            
    //         }
    //     }  
    // }

})();
