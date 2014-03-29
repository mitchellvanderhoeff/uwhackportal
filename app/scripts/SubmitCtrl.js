/**
 * Created by mitch on 2014-03-29.
 */
function SubmitCtrl($scope, $location, HacksService) {
   $scope.hack = {
      authors: []
   };

   $scope.addAuthor = function () {
      $scope.hack.authors.push({
         name: ""
      })
   };

   $scope.removeAuthorAtIndex = function (index) {
      if ($scope.hack.authors.length <= 1) {
         return;
      }
      $scope.hack.authors.splice(index, 1);
   };

   $scope.submit = function () {
      if ($scope.hackForm.$invalid) {
         return;
      }
      var hack = $scope.hack;
      hack.authors = _($scope.hack.authors).map(function (author) {
         return author.name;
      });
      HacksService.submitHack(hack, function (error, identifier) {
         if (error) {
            alert(error)
         } else {
            $location.path('/browse/' + identifier);
         }
      });
   };

   $scope.addAuthor()
}