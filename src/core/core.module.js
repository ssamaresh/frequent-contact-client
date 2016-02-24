(function() {
    'use strict';

    angular.module('app.core', [
        'ngAnimate', 'ngMaterial', 'ngMessages', 'ngSanitize',

        // Our reusable framework
        'fw.exception', 'fw.logger',

        // 3rd Party modules
        'ui.bootstrap', 'ui.router'
    ]);
})();
