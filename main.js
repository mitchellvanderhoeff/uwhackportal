/**
 * Created by mitch on 2014-03-29.
 */
var express = require('express');
var server = express();
var Hacks = require('./server/Hacks');

server.post("/submit", function(req, res) {
   Hacks.submitHack(req.body, function(error, identifier) {
       if (error) {
          res.send(500, error)
       } else {
          res.send(identifier);
       }
   })
});

server.get("/fetch", function(req, res) {
   var limit = req.param('limit');
   var limitNum = parseInt(limit);
   Hacks.fetchHacks(limitNum, function(error, hacks) {
       if (error) {
          res.send(500, error)
       } else {
          res.send(hacks);
       }
   });
});

server.get("/fetch/:identifier", function(req, res) {
   var identifier = req.param('identifier');
   Hacks.fetchHackByIdentifier(identifier, function(error, hack) {
       if (error) {
          res.send(500, error)
       } else {
          res.send(hack)
       }
   })
});

server.use(express.static(__dirname + '/app'));
server.use(function(req, res) {
    console.log(req.method + " " + req.url);
});

server.listen(process.env.PORT || 9000);