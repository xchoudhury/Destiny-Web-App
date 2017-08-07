var express = require('express');
var router = express.Router();

var request = require('request');
var bodyParser = require('body-parser')

var destinyKey = process.env.DESTINY_KEY;
var defaultUserName = "xchoudhury"
const HOST = 'http://www.bungie.net/Platform/Destiny/';
var baseRequest = request.defaults({headers: {'X-API-Key': destinyKey}});

function getMemID(username, res){
     baseRequest(HOST + '2/Stats/GetMembershipIdByDisplayName/' + username + '/',
			  function (err, response, body) {
                var memID =  JSON.parse(body)["Response"];
                
                //res.render('destiny', {body:memID});
                return getCharSummary(username, memID, res);
		    });
}

function getCharSummary(username, memID, res){
    baseRequest(HOST + '2/Account/' + memID + '/Summary/',
    function(err, response, body){
        var summary = JSON.parse(body);
        options = {
         summary: JSON.stringify(summary),
         emblem: 'http://bungie.net' + summary.Response.data.characters[0].emblemPath,
         emblemBackground: 'http://bungie.net' +
            summary.Response.data.characters[0].backgroundPath,
         user: username
        };

        res.render('destiny', options);
    });
}

/* GET home page. */
router.get('/', function(req, res) {
    res.render('destiny_form');
    // res.send("Under Maintance");
		   //getMemID(res);
           //getCharSummary('4611686018429269605', res);

});

router.get('/user', function(req, res) {
    var username = req.query.username;
    getMemID(username, res);
    //var memID = getMemID(username);
    //console.log("memID", memID);
    //var options = getCharSummary(memID);
    //var options = getMemID(username);
    //options.user = username;
    //res.render('destiny', options);

    // options = {
    //     user : username
    // };

    // res.render('destiny', options);
});

module.exports = router;