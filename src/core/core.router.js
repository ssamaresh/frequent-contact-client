(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(configFunction);

    configFunction.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider
        .when('/', '/dashboard')
        .otherwise('/');

        $stateProvider

            .state('dashboard', {
                url: '/dashboard',
                template: '<fc-dashboard></fc-dashboard>',
                data: {
                    selectedIndex: 0
                },
                onEnter: function() { console.log("enter dashboard"); }
            })

            // .state('dashboard.contacts', {
            //     url: 'contacts',
            //     template: '<h1>Contacts</h1>',
            //     data: {
            //         selectedIndex: 0
            //     },
            //     onEnter: function() { console.log("enter Contacts"); }
            // })

            .state('tasks', {
                url: '/tasks',
                template: '<fc-tasks></fc-tasks>',
                data: {
                    selectedIndex: 1
                },
                onEnter: function() { console.log("enter tasks"); }
            })

            .state('tasks.detail', {
                url: '/:taskId',
                /* jshint maxlen:false */
                /* jscs:disable maximumLineLength */
                template: '<fc-task-detail data-task="vm.task"></fc-task-detail>',
                resolve: {
                    task: function(taskService, $stateParams) {
                        var taskId = parseInt($stateParams.taskId, 0);
                       return taskService.getTask(taskId)
                            .then(function(task) {
                                return task;
                            });
                    }
                },
                // intermediate controller to capture the result of resolve and pass it to the directive
                controller: ['task', function(task) {
                    this.task = task;
                }],
                controllerAs: 'vm'
            })

            .state('completed', {
                url: '/completed',
                template: '<h1>completed</h1',
                data: {
                    selectedIndex: 2
                },
                onEnter: function() { console.log("enter completed"); }
            })

            .state('search', {
                url: '/search',
                template: '<h1>Search</h1>',
                data: {
                    selectedIndex: 3
                },
                onEnter: function() { console.log("enter search"); }
            })

    }

})();
