/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('contactService', contactService);

    contactService.$inject = ['$http', '$location', 'exception', 'api'];

    /* @ngInject */
    function contactService($http, $location, exception, api) {
        var service = {

            contact: null,
            getContacts: getContacts,
            createContact: createContact,
            setNewContactCreated: setNewContactCreated,
            getNewContactCreated: getNewContactCreated
        };

        // local variables - will be $watched
        service.people = [];
        service.candidates = [];
        service.contact = [ {}, false ];

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

                console.log('contacts', collapseCollectionEmbeddedOntoBase( data.data ));

                return collapseCollectionEmbeddedOntoBase( data.data );
            }
        }

        function createContact ( data ) {

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
