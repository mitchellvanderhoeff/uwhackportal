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

server.listen(process.env.PORT || 9000);