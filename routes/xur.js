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
                        var items = [];

                        // body.Response.data.saleItemCategories.forEach(function(saleItem){
                        //     saleItem.saleItems.forEach(function(myItem){
                        //         var hashID = myItem.item.itemHash;

                        //         baseRequest(HOST + 'Manifest/6/' + hashID,
                        //             function(err, response, body){
                        //                 body = JSON.parse(body);
                        //                 var item = {};
                        //                 item.name = body.Response.data.inventoryItem.itemName;
                        //                 item.type = body.Response.data.inventoryItem.itemTypeName;
                        //                 item.tier = body.Response.data.inventoryItem.tierTypeName;
                        //                 items.push(item);

                                    
                        //             console.log(items);
   
                        //             });
                        //     });
                        // });

                        options  = {
                            isXurHere: true,
                            items: items
                        };
                    res.render('xur', options);     
                    }
                });
});
module.exports = router;