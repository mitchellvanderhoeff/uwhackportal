/**
 * Created by mitch on 2014-03-29.
 */
var app = angular.module('uwHackPortalApp', ['ngRoute']);

app.config(function($routeProvider) {
   $routeProvider
      .when('/home', {
         templateUrl: 'views/home.html'
      })
      .when('/submit', {
         templateUrl: 'views/submit.html',
         controller: 'SubmitCtrl'
      })
      .when('/browse', {
         templateUrl: 'views/browse.html',
         controller: 'BrowseCtrl'
      })
      .when('/browse/:identifier', {
         templateUrl: 'views/viewHack.html',
         controller: 'ViewHackCtrl'
      })
      .otherwise({
         redirectTo: '/home'
      })
});