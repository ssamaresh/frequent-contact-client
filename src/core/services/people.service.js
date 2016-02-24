/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('peopleService', peopleService);

    peopleService.$inject = ['$http', '$location', 'exception', 'api'];

    /* @ngInject */
    function peopleService($http, $location, exception, api) {
        var service = {

            people: null,
            getPeople: getPeople,
            getContacts: getContacts
        };

        // local variables - will be $watched
        service.people = [];
        service.candidates = [];

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

        function getContacts ( person, filters ) {

            return $http.get( api + '/people/' + person + '/contacts', { params: filters } )
                .then(getContactsComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getPeople')(message);
                    $location.url('/');
                });

            function getContactsComplete (data) {

                //console.log('contacts', collapseCollectionEmbeddedOntoBase( data.data ));
                return collapseCollectionEmbeddedOntoBase( data.data );
            }
        }

        function getPeople ( filters ) {

            return $http.get( api + '/people', { params: filters } )
                .then(getPeopleComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getPeople')(message);
                    $location.url('/');
                });

            function getPeopleComplete (data) {

                service.people = collapseCollectionEmbeddedOntoBase( data.data );

                // console.log("service.people", service.people);

                return service.people;
            }
        }

    }
})();
