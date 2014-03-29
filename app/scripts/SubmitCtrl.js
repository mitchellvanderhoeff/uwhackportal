/**
 * Created by mitch on 2014-03-29.
 */
function SubmitCtrl($scope)
{
   $scope.name = "";
   $scope.authors = [];

   $scope.addAuthor = function() {
      $scope.authors.push({
         name: ""
      })
   };

   $scope.removeAuthorAtIndex = function (index) {
      if ($scope.authors.length <= 1) {
         return;
      }
      $scope.authors.splice(index, 1);
   };

   $scope.addAuthor()
}