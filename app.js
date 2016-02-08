'use strict';
// Ссылка на серверную часть приложения
var serviceBase = 'http://redpen/';
// Основной модуль приложения и его компоненты
var redpenApp = angular.module('redpenApp', [
  'ngRoute',
  'redpenApp.site',
  'redpenApp.comment',
  'redpenApp.project',
]);
// рабочий модуль
var redpenApp_site = angular.module('redpenApp.site', ['ngRoute']);
var redpenApp_comment = angular.module('redpenApp.comment', ['ngRoute']);
var redpenApp_project = angular.module('redpenApp.project', ['ngRoute']);

redpenApp.config(['$routeProvider', function($routeProvider) {
  // Маршрут по-умолчанию
  $routeProvider.otherwise({redirectTo: '/site/index'});
}]);	