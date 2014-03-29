/**
 * Created by mitch on 2014-03-29.
 */
function BrowseCtrl($scope, HacksService) {
   $scope.hacks = [];
   HacksService.fetchHacks(100, function (error, hacks) {
      if (!error) {
         $scope.hacks = hacks;
      } else {
         alert(JSON.stringify(error));
      }
   })
}