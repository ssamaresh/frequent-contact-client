/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('taskService', taskService);

    taskService.$inject = ['$http', '$location', '$cacheFactory', 'exception', 'api'];

    /* @ngInject */
    function taskService($http, $location, $cacheFactory, exception, api) {
        
        var service = {
            getTasks: getTasks,
            getTask: getTask
        };

        service.tasks = [];
        service.task = [];

        return service;

/**
 * @typedef {Person[]} People
 *
 * @typedef {object} Person
 */

        function collapseCollectionEmbeddedOntoBase ( data ) {

            var baseCollection = [],
                base = null;

            angular.forEach( data, function ( arrItem ) {
                base = {};
                angular.forEach( Object.keys(arrItem), function ( propKey ) {
                    if ( propKey === "_embedded") {
                        angular.forEach( Object.keys(arrItem[propKey]), function ( embeddedPropKey ) {
                            base[embeddedPropKey] = arrItem[propKey][embeddedPropKey];
                        });
                    } else {
                        base[propKey] = arrItem[propKey];
                    }
                });
                baseCollection.push( base );
            });

            return baseCollection;
        }

        /**
         * Get all tasks.
         * @return {Promise} A promise that returns an array of tasks if resolved
         */
        function getTasks( company ) {

            return $http.get( api + '/tasks', { params: { company: company } } )
                .then(getTasksComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for get tasks')(message);
                    $location.url('/');
                });

            function getTasksComplete (data) {

                service.tasks = collapseCollectionEmbeddedOntoBase( data.data );
                return collapseCollectionEmbeddedOntoBase( data.data );
            }
        }

        function getTask(taskId) {
            
            // return $http.get('/src/task.json')
            return $http.get(api + '/tasks/' + taskId)
                .then(getTaskSuccess)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getTask')(message);
                    $location.url('/');
                });

            function getTaskSuccess (data) {
                service.task = collapseCollectionEmbeddedOntoBase( data.data );
                return collapseCollectionEmbeddedOntoBase( data.data );
            }

        }

        function clearCache() {
            var cache = $cacheFactory.get('$http');
            cache.remove(api + '/tasks');
        }

        /* TODO */
        function createTask ( data ) {

            var contactData = {
                'first_name' : data.firstName,
                'last_name' : data.lastName,
                'email' : data.email,
                'is_internal_person': true,
                'company': data.company,
                'division': data.division,
                'title': data.title,
                'phone ': data.phone,
                'picture': data.picture,
                'notes': data.notes,
                'contact_owner_pk': 1
            };

            return $http.post( api + '/people/', contactData)
                .then(function(res){
                    if (res.status === 200 && res.statusText === 'OK'){
                        setNewContactCreated(contactData, true);
                        $location.url('/dashboard');
                    }

                })
                .catch(function(message){
                    exception.catcher('XHR Failed for create contact')(message);
                    setNewContactCreated(contactData, false);
                    $location.url('/createContact');
                });

            // return $http.post( api + '/people/' + 'edana' +
            //                     '/contacts/' + contactUid +
            //                     '/contactEvents', data)
            // return $http.post( api + '/people/' + 'edana' +
            //                     '/contacts/' , data)
            //     .then(createContactComplete)
            //     .catch(function(message) {
            //         exception.catcher('XHR Failed for createContactEvent')(message);
            //         $location.url('/');
            //     });

            // function createContactComplete (data) {

            //     return data.data;
            // }
        }

        function setNewContactCreated (newContact, status) {
            service.contact[0] = newContact;
            service.contact[1] = status;
        }

        function getNewContactCreated() {
            return service.contact;
        }
    }
})();
