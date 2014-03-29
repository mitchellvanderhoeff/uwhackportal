/**
 * Created by mitch on 2014-03-29.
 */

function ViewHackCtrl($scope, $routeParams, HacksService) {
   $scope.hack = {};

   HacksService.fetchHackByIdentifier($routeParams['identifier'], function(error, hack) {
       if (error) {
          alert(error);
       } else {
          $scope.hack = hack;
       }
   })
}