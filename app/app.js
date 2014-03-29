/**
 * Created by mitch on 2014-03-29.
 */
var app = angular.module('uwHackPortalApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
   $routeProvider
      .when('/home', {
         templateUrl: 'views/home.html',
         controller: 'HomeCtrl'
      })
      .when('/submit', {
         templateUrl: 'views/submit.html',
         controller: 'SubmitCtrl'
      })
      .when('/browse', {
         templateUrl: 'views/browse.html',
         controller: 'BrowseCtrl'
      })
}]);