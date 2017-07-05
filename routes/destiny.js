var express = require('express');
var router = express.Router();

var request = require('request');
var bodyParser = require('body-parser')

var credentials = {};
credentials.destinyKey = 'c54def0b07024cbeac9003c893854178';
credentials.defaultUserName = 'xchoudhury';

const HOST = 'http://www.bungie.net/Platform/Destiny/';
var baseRequest = request.defaults({headers: {'X-API-Key': credentials.destinyKey}});

function getMemID(res){
     baseRequest(HOST + '2/Stats/GetMembershipIdByDisplayName/' + credentials.defaultUserName + '/',
			  function (err, response, body) {

                var memID =  JSON.parse(body)["Response"];
                //res.render('destiny', {body:memID});
                getCharSummary(memID, res);
		    });
}

function getCharSummary(memID, res){

    baseRequest(HOST + '2/Account/' + memID + '/Summary/',
    function(err, response, body){
        var summary = JSON.parse(body);

        options = {
         summary: JSON.stringify(summary),
         user: "xchoudhury",
         emblem: 'http://bungie.net' + summary.Response.data.characters[0].emblemPath,
         emblemBackground: 'http://bungie.net' + summary.Response.data.characters[0].backgroundPath
        };
        res.render('destiny', options);
    });
}

/* GET home page. */
router.get('/', function(req, res) {
		   getMemID(res);
           //getCharSummary('4611686018429269605', res);
});

module.exports = router;