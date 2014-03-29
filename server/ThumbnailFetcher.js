/**
 * Created by mitch on 2014-03-29.
 */
var CLIENT_ID = '36a0cda3abb7eac';

var webshot = require('webshot');
var imgur = require('imgur-node-api');
var path = require('path');
var _ = require('underscore');

imgur.setClientID(CLIENT_ID);

module.exports = {
   fetchThumbnailForURL: function(url, callback) {
      var fileName = _.uniqueId('website-thumbnail') + ".png";
      webshot(url, fileName, function(error) {
           if (error) {
              callback(error, null)
           } else {
              imgur.upload(path.join(__dirname, fileName), function(imgurError, response) {
                  callback(imgurError, response.data.link);
              })
           }
       })
   }
};
