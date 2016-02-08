'use strict';
redpenApp_comment.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/comment/index', {
        templateUrl: 'views/comment/index.html',
        controller: 'index'
    })
    .when('/comment/create', {
        templateUrl: 'views/comment/create.html',
        controller: 'create',
        resolve: {
            comment: function(services, $route){
                return services.getComments();
            }
        }
    })
    .when('/comment/update/:commentId', {
        templateUrl: 'views/comment/update.html',
        controller: 'update',
        resolve: {
          comment: function(services, $route){
            var commentId = $route.current.params.commentId;
            return services.getComment(commentId);
          }
        }
    })
    .when('/comment/delete/:commentId', {
        templateUrl: 'views/comment/index.html',
        controller: 'delete',
    })
    .otherwise({
        redirectTo: '/comment/index'
    });
}]);

redpenApp_comment
.controller('index', ['$scope', '$http', 'services', 
    function($scope,$http,services) {
    $scope.message = 'Everyone come and see how good I look!';
    services.getComments().then(function(data){
        $scope.comments = data.data;
    });    
    $scope.deleteComment = function(commentID) {
        if(confirm("Are you sure to delete comment number: " + commentID)==true && commentID>0){
            services.deleteComment(commentID);    
            $route.reload();
        }
    };
}])
.controller('create', ['$scope', '$http', 'services','$location','comment', 
    function($scope,$http,services,$location,comment) {
    $scope.message = 'Look! I am an about page.';
    $scope.createComment = function(comment) {
        var results = services.createComment(comment);
    }  
}])
.controller('update', ['$scope', '$http', '$routeParams', 'services','$location','comment', 
    function($scope,$http,$routeParams,services,$location,comment) {
    $scope.message = 'Contact us! JK. This is just a demo.';
    var original = comment.data;
    $scope.comment = angular.copy(original);
    $scope.isClean = function() {
        return angular.equals(original, $scope.comment);
    }
    $scope.updateComment = function(comment) {    
        var results = services.updateComment(comment);
    } 
}]);