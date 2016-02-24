/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('userService', userService);

    userService.$inject = [ ];

    /* @ngInject */
    function userService ( ) {
        var service = {
            getCurrentUser: getCurrentUser
        };

        return service;

        function getCurrentUser() {
            // TODO: MAKE THIS REAL (note: this will not hit an endpoint for data, it will just KNOW)
            return 'Kelsey Bunnel';
        }

    }
})();
