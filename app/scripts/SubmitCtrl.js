/**
 * Created by mitch on 2014-03-29.
 */
function SubmitCtrl($scope, $location, HacksService)
{
   $scope.name = "Mizzl World 1000";
   $scope.authors = [{
      name: "mizzl drizzl"
   }];

   $scope.description = "Welcome to my world";
   $scope.appUrl = "http://www.google.com";
   $scope.sourceUrl = "";

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

   $scope.submit = function() {
      var hack = {
         name: $scope.name,
         authors: _($scope.authors).map(function(author) {
             return author.name;
         }),
         description: $scope.description,
         appUrl: $scope.appUrl,
         sourceUrl: $scope.sourceUrl
      };
      HacksService.submitHack(hack, function(error, identifier) {
          if (error) {
             alert(error)
          } else {
             $location.path('/browse/'+identifier);
          }
      });
   };

   $scope.addAuthor()
}