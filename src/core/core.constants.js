/* global _ */

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('_', _)
        .constant('moment', moment)
        .constant('api', 'http://localhost:8080/api/v1');
})();
