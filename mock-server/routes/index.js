module.exports = function(app) {
    var api = '/api';
    var data = '/../../data/';
    var jsonfileservice = require('./utils/jsonfileservice')();

    // people services
    app.get(api + '/people', getPeople);

    // helper method for comparing query parameters to an expected object
    // uses toString, which can be improved upon
    function compareQueryParams ( reqObject, expectedResult ) {
        var reqObject = reqObject || {};

        return reqObject.toString() == expectedResult.toString();
    }

    function getPeople(req, res, next) {

        var json = null,
            fileNameBase = 'get-people';

        // serve full assignments file if query paramters matches initial set
        if ( compareQueryParams( true, true ) ) {
            json = jsonfileservice.getJsonFromFile(data + fileNameBase + '-all.json');
        } else {
            json = jsonfileservice.getJsonFromFile(data + fileNameBase + '-filtered.json');
        }

        res.send( json );
    }


};
