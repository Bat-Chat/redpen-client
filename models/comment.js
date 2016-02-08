'use strict';

redpenApp_comment.factory("services", ['$http','$location','$route', 
    function($http,$location,$route) {
    var obj = {};
    obj.getComments = function(){
        return $http.get(serviceBase + 'comments');
    }
    obj.createComment = function (comment) {
        return $http.post(serviceBase + 'comment', comment )
            .then( successHandler )
            .catch( errorHandler );
        function successHandler( result ) {
            $location.path('/comment/index');            
        }
        function errorHandler( result ){
            alert("Error data")
            $location.path('/comment/create')
        }
    };    
    obj.getComment = function(commentID){
        return $http.get(serviceBase + 'comment/' + commentID);
    }

    obj.updateComment = function (comment) {
        return $http.put(serviceBase + 'comment/update/' + comment.id, comment )
            .then( successHandler )
            .catch( errorHandler );
        function successHandler( result ) {
            $location.path('/comment/index');
        }
        function errorHandler( result ){
            alert("Error data")
            $location.path('/comment/' + comment.id)
        }    
    };    
    obj.deleteComment = function (commentID) {
        return $http.delete(serviceBase + 'comment/delete/' + commentID)
            .then( successHandler )
            .catch( errorHandler );
        function successHandler( result ) {
            $route.reload();
        }
        function errorHandler( result ){
            alert("Error data")
            $route.reload();
        }    
    };    
    return obj;   
}]);