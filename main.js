/**
 * Created by mitch on 2014-03-29.
 */
var express = require('express');
var server = express();
var Hacks = require('./server/Hacks');

server.post("/submit", function(req, res) {
   Hacks.submitHack(req.body)
});

server.get("/fetch", function(req, res) {
   Hacks.fetchHacks(parseInt(req.param('limit')), function(error) {
       if (error) {
          res.send(500, error)
       } else {
          res.send(200);
       }
   });
});

server.use(express.static(__dirname + '/app'));