/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('lookupService', lookupService);

    lookupService.$inject = [ ];

    /* @ngInject */
    function lookupService ( ) {
        var service = {
            getEmploymentById: getEmploymentById
        };

        return service;

        function getEmploymentById( id ) {
            return $http.get( api + '/employments/' + id, { cache: true} )
                .then(getEmploymentComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getEmploymentById')(message);
                    $location.url('/');
                });

            function getEmploymentComplete (data) {

                return data.data;
            }
        }

    }
})();
