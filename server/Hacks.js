/**
 * Created by mitch on 2014-03-29.
 */

var mongojs = require('mongojs');
var db = mongojs(process.env.MONGOHQURL || 'uwhack');
var HacksCollection = db.collection('hacks');
var _ = require('underscore');

module.exports = {
   submitHack: function(rawHackData, callback) {
      var hack = _(rawHackData).pick(
         'name',
         'authors',
         'description',
         'appUrl',
         'sourceUrl'
      );
      HacksCollection.insert(hack, callback);
   },
   fetchHacks: function(limit, callback) {
      HacksCollection.find().limit(limit || 1).toArray(callback);
   }
};