var app = angular.module('RecipeApp',['ngRoute','ngAnimate'])
	app.config(function($routeProvider,$locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl:'partials/main.html',
				controller:'SampleCtrl'
			})

			.when('/pantry', {
				templateUrl:'partials/test.html',
				controller:'PantryController'
			})

			.otherwise({
				redirectTo:'/'
			})
	})

