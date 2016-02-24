(function() {
    'use strict';

    angular.module('app', [
        // Common (everybody has access to these)
        'app.core',

        // Features (listed alphabetically)
        'app.appbar',
        'app.approot',
        'app.contact',
        'app.contacts',
        'app.dashboard',
        'app.history',
        'app.sidenav',
        'app.tabs',
        'app.tasks'
    ]);
    
})();
