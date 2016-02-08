'use strict';
redpenApp_project.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    // .when('/project/index', {
    //     templateUrl: 'views/project/index.html',
    //     controller: 'index'
    // })
    .when('/project/create', {
        templateUrl: 'views/project/create.html',
        controller: 'create',
        resolve: {
            project: function(services, $route){
                return services.getProjects();
            }
        }
    })
    .when('/project/delete/:projectId', {
        templateUrl: 'views/project/index.html',
        controller: 'delete',
    })
    .otherwise({
        redirectTo: '/site/index'
    });
}]);

redpenApp_project
.controller('index', ['$scope', '$http', 'services', 
    function($scope,$http,services) {
        services.getProjects().then(function(data){
            $scope.projects = data.data;
        });
        $scope.deleteProject = function(projectId) {
            if(confirm("Are you sure to delete project number: " + projectId) == true && projectId > 0){
                services.deleteProject(projectId);    
                $route.reload();
            }
        };
    }
])
.controller('create', ['$scope', '$http', 'services', '$location', 'project',
    function($scope,$http,services,$location,project) {
        $scope.createProject = function(project) {
            var result = services.createProject(project);
        };
    }
]);