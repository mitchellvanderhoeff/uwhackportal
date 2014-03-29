/**
 * Created by mitch on 2014-03-29.
 */
angular.module('uwHackPortalApp')
   .service('HacksService', function($http) {
      this.submitHack = function(hack, callback) {
          $http
             .post('/submit', hack)
             .success(function(data) {
                 callback(null, data)
             })
             .error(function(error) {
                 callback(error, null)
             })
      };

      this.fetchHacks = function(limit, callback) {
          $http
             .get('/fetch?limit='+limit)
             .success(function(data) {
                 callback(null, data)
             })
             .error(function(error) {
                 callback(error, null)
             })
      };

      this.fetchHackByIdentifier = function(identifier, callback) {
          $http
             .get('/fetch/'+identifier)
             .success(function(data) {
                 callback(null, data)
             })
             .error(function(error) {
                 callback(error, null)
             });
      }
});