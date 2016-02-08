'use strict';

redpenApp_project.factory("services", ['$http','$location','$route', 
    function($http,$location,$route) {
    var obj = {};
    obj.getProjects = function(){
        return $http.get(serviceBase + 'projects');
    }

    obj.createProject = function(project){
        return $http.post(serviceBase + 'project', project)
        	.then(successHandler)
        	.catch(errorHandler);

        function successHandler(result) {
        	$location.path('/site/index');
        }

		function errorHandler(result) {
			alert('Error data');
        	$location.path('/project/create');
        }
    }

    obj.deleteProject = function(projectId){
        return $http.delete(serviceBase + 'project/deleete/', projectId)
        	.then(successHandler)
        	.catch(errorHandler);

        function successHandler(result) {
        	$route.reload();
        }

		function errorHandler(result) {
			alert('Error data');
        	$route.reload();
        }
    }

    return obj;   
}]);