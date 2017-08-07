var express = require('express');
var router = express.Router();

var request = require('request');
var bodyParser = require('body-parser')

var destinyKey = process.env.DESTINY_KEY;
var defaultUserName = "xchoudhury"
const HOST = 'http://www.bungie.net/Platform/Destiny/';
var baseRequest = request.defaults({headers: {'X-API-Key': destinyKey}});

/* GET home page. */
router.get('/', function(req, res) {
    baseRequest(HOST + 'Advisors/Xur/',
                function (err, response, body) {
                    body = JSON.parse(body);
                    if(body.ErrorCode > 1){
                        options = {
                            isXurHere: false,
                            errorCode: body.ErrorCode,
                            errorStatus: body.ErrorStatus,
                            message: body.Message
                        };
                        return res.render('xur', options);
                    }
                    
                    if(!err && response.statusCode < 400){
                        options  = {
                            isXurHere: true
                        };
                        res.render('xur', options);
                    }
                });
});
module.exports = router;