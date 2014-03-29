/**
 * Created by mitch on 2014-03-29.
 */

var mongojs = require('mongojs');
var db = mongojs(process.env.MONGOHQURL || 'uwhack');
var HacksCollection = db.collection('hacks');
var _ = require('underscore');
var Case = require('case');

function generateIdentifier(name) {
   var identifier = Case.snake(name);
   var charMap = "abcdefghijklmnopqrstuvwxysABCDEFGHIJKLMNOPQRSTUVWXYS1234567890";
   var unique = "";
   for(var i = 0; i < 10; i++) {
      var random = Math.floor((Math.random() * charMap.length));
      unique += charMap[random];
   }
   identifier = identifier + "_" + unique;
   return identifier;
}

module.exports = {
   submitHack: function(rawHackData, callback) {
      if (!rawHackData) {
         callback("ERROR: Could not read hack data", null);
         return;
      }
      var hackData = _(rawHackData).pick(
         'name',
         'authors',
         'description',
         'appUrl',
         'sourceUrl'
      );
      hackData.identifier = generateIdentifier(hackData.name);
      HacksCollection.insert(hackData, function(error, hack) {
          if (error) {
             console.log("Failed to insert hack due to: "+error);
             callback(error, null);
          } else {
             console.log("Inserted hack: "+JSON.stringify(hack));
             callback(null, hack.identifier);
          }
      });
   },
   fetchHacks: function(limit, callback) {
      HacksCollection.find().limit(limit || 1).toArray(callback);
   },
   fetchHackByIdentifier: function(identifier, callback) {
      HacksCollection.findOne({
         identifier: identifier
      }, callback)
   }
};