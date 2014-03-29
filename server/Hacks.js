/**
 * Created by mitch on 2014-03-29.
 */

var mongojs = require('mongojs');
var db = mongojs(process.env.MONGOHQURL || 'uwhack');
var HacksCollection = db.collection('hacks');
var _ = require('underscore');
var Case = require('case');
var ThumbnailFetcher = require('./ThumbnailFetcher');

function generateIdentifier(name) {
   var identifier = Case.snake(name);
   var charMap = "wowmuchdogecoin1234567890";
   var unique = "";
   for(var i = 0; i < 10; i++) {
      var random = Math.floor((Math.random() * charMap.length));
      unique += charMap[random];
   }
   identifier = identifier + "_" + unique;
   return identifier;
}

function isUrl(string) {
   return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(string)
}

function fetchThumbnailForHack(hack) {
   ThumbnailFetcher.fetchThumbnailForURL(hack.appUrl, function(error, thumbUrl) {
       if (!error) {
          hack.thumbUrl = thumbUrl;
          HacksCollection.save(thumbUrl);
       }
   })
}

module.exports = {
   submitHack: function(rawHackData, callback) {
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
             callback(error, null);
          } else {
             callback(null, hack.identifier);
             if (isUrl(hack.appUrl)) {
                fetchThumbnailForHack(hack);
             }
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