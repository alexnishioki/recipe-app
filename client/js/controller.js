var app = angular.module('RecipeApp')

app.factory('getRecipes',["$http",function($http) {
	var getRecipes = {}
      	getRecipes.getData = function() { 
      		return $http.get('/api/recipes')
	}
	console.log(getRecipes.getData())
 			return getRecipes
}])

app.factory('personal',function(){
	var personal=[]
	var addInput={}
	addInput.add = function(input) {
		personal = input
	}

	addInput.list = function() {
		return personal
	}
	return addInput
})

app.factory('getUserData',["$http",function($http) {
	var getUserData = {}
	getUserData.apiData = function() {
		return $http.get('/api/userRecipes')
 		}
 		return getUserData
 		// console.log(getUserData)
 	}])




app.controller('MainCtrl',function($scope,$http,$location,getRecipes) {
	$scope.recipes = {}
	$scope.recipeID = {}


	//get recipe list based on input
	$scope.retrieve = function() {

		var keyTwo = '4e7b2abc3e16cf413126fd520d5af0c7'

		var key = '3e9166ad629eca6587a5e501e4e30961'

		getRecipes.getData().then(function(data) {
		$scope.recipes = data.data
		console.log($scope.recipes)
	}).then(function() {
		//get recipe description based on individual recipe id
		for(var i = 0; i < $scope.recipes.recipes.length; i++) {
				var id = {urls:$scope.recipes.recipes[i].source_url.toString()}
				var query = {ID:$scope.recipes.recipes[i].recipe_id}
				console.log(query)
					//send id to server
					$http.post('/api/id',query).then(function(data) {	 
						 console.log(data.data.recipe)
			})		
		}
	})
}

	$scope.getInitialData = $http.get('/api/urls').then(function(data) {
		console.log(data.data)
	})
	console.log($scope.recipes)
	$scope.key = '4e7b2abc3e16cf413126fd520d5af0c7'
	$scope.key2 = '3e9166ad629eca6587a5e501e4e30961'
	
	$scope.fish = {}

	$scope.getRecipes =
	function() {

	 	$http.get('/api/recipes')
		$scope.fish = res.data
		console.log($scope.fish)
		
		
	 }

	})

app.controller('SampleCtrl',function($scope,$http,$location,$window) {
	$http.get('/js/data.json').then(function(response) {
		$scope.recipes = response.data
		console.log($scope.recipes)
		for(var i = 0; i < $scope.recipes.length; i++) {

		$scope.source = $scope.recipes[i].recipe.source_url
		console.log($scope.source)
		$scope.extLink = function(link) {
			$window.open(link)
			}
		}
	}) 
})

app.controller('PantryController',function($scope,$http,$timeout,$location,$window,getUserData) {

	$scope.addInput = {}
	$scope.addNewInput = function() {
		$scope.ingredients.push($scope.addInput)

	}

	$scope.recipeName = []
	$scope.description = [{step:'step1'}]
	$scope.ingredients = [{ingredient:'ingredient1'}];

	
	$scope.addIngredient = function() {
		var newIngredient = $scope.ingredients.length+1;
		$scope.ingredients.push({'ingredient':'ingredient'+newIngredient})
    	// console.log($scope.ingredients)

	}

	$scope.addDescription = function() {
		var newDescription = $scope.description.length+1;
		$scope.description.push({'step':'step'+newDescription})
		// console.log($scope.description)
	}

	
	$scope.getRecipesOnSubmit =function() { 
		$http.get('/api/userRecipes').then(function(res) {
		console.log(res.data)
		console.log('returned recipes from DB')
		})
	}

	$scope.clear = function(){
		$scope.ingredients.splice(0,$scope.ingredients.length)
	}

	$scope.divHeight = function() {
		$scope.expandDiv = false
		$scope.expandDiv=!$scope.expandDiv
	}

	$scope.submitRecipe = function() {
		// id | title | ingredients | ingredient_id | description | recipe_id | img 
		var submittedRecipeObj = {
			ingredients:$scope.ingredients,
			description:$scope.description}
		$scope.savedData = submittedRecipeObj
			$http.post('/api/userRecipes',submittedRecipeObj)
	}
	
	getData()

	function getData() {
		getUserData.apiData().then(function(res) {
			$scope.allUserDbData = res.data;
			console.log($scope.allUserDbData)
		})
	}

	$scope.timed_data = function() {
		$timeout($scope.refreshData,4000)
	}

	$scope.refreshData = function() {
		getUserData.apiData().then(function(res) {
			$scope.allUserDbData = res.data;
			console.log(res.data)
			for(var i = 0; i < res.data.length; i++) {
				var ingredient_data = res.data[i].description
				if(ingredient_data !== null) {
					$scope.description = ingredient_data[i]
					console.log($scope.description)
					}
				var description_data = res.data[i].ingredient
				if(description_data !== null) {
					$scope.ingredient = description_data[i]
					console.log($scope.ingredient)
					}
				console.log($scope.allUserDbData)
			}
		})
	}
})
	
app.controller('HomeController',function($scope,$location) {
	$scope.isActive = function(route) {
    	return route === $location.path();
  	}                   
})









