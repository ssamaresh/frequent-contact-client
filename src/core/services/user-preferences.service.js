/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('userPreferencesService', userPreferencesService);

    userPreferencesService.$inject = [
        '$http', '$location', 'exception', 'api'
    ];

    /* @ngInject */
    function userPreferencesService ( $http, $location, exception, api ) {
        var service = {
            getAssignmentsFilterDefaultData: getAssignmentsFilterDefaultData,
            getCandidatesFilterDefaultData: getCandidatesFilterDefaultData,
            objectFormatToFlatCopy: objectFormatToFlatCopy
        };

        return service;

        function getAssignmentsFilterDefaultData() {
            return $http.get(api + '/assignmentsFilterDefaultData', { cache: true } )
                .then( assignmentsFilterDefaultDataComplete )
                .catch( assignmentsFilterDefaultDataError );

            function assignmentsFilterDefaultDataComplete ( data ) {
                return data.data;
            }

            function assignmentsFilterDefaultDataError ( message ) {
                exception.catcher( 'XHR Failed for assignmentsFilterDefaultData' )( message );
                $location.url( '/' );
            }
        }

        function getCandidatesFilterDefaultData() {
            return $http.get(api + '/candidatesFilterDefaultData', { cache: true } )
                .then( candidatesFilterDefaultDataComplete )
                .catch( candidatesFilterDefaultDataError );

            function candidatesFilterDefaultDataComplete ( data ) {
                return data.data;
            }

            function candidatesFilterDefaultDataError ( message ) {
                exception.catcher( 'XHR Failed for candidatesFilterDefaultData' )( message );
                $location.url( '/' );
            }
        }

        function objectFormatToFlatCopy ( objectFormat ) {
            var flat = angular.copy( objectFormat ),
                childTemp = null;

            angular.forEach( flat, function ( item, i ) {

                // boolean
                if ( item === false || item === true ) {
                    flat[ i ] = item;
                // array: [ { id: 'val' }, ... ]
                } else if ( angular.isArray( item ) ) {
                    childTemp = [];
                    angular.forEach( item, function ( childItem ) {
                        childTemp.push( childItem.id );
                    });
                    flat[ i ] = childTemp;
                // slider: { min: 0, max: 1, rangelist: [] }
                } else {
                    childTemp = {
                        min: item.rangeList[ item.min ],
                        max: item.rangeList[ item.max ]
                    };
                    flat[ i ] = childTemp;
                }
            });

            return flat;
        }

    }
})();
