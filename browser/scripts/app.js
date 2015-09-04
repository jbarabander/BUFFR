var app = angular.module('buffr', ['ui.router'])
.config(function ($locationProvider) {
  $locationProvider.html5Mode(true);
});