var express = require('express'),
	pg = require('pg'),
	knex = require('./db/knex'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	path = require('path'),
	http=require('http'),
	request = require('request'),
	requestP = require('request-promise'),
	app = express();

	app.use(express.static(path.join(__dirname, 'client')))
	app.use(bodyParser.urlencoded({extended:true}))
	app.use(bodyParser.json())
	app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
		});

	// app.get('/api/recipes',function(req,res) {
	// 	var key = '3e9166ad629eca6587a5e501e4e30961'
	// 	var query= 'fish'
	// 	console.log(query)
	// 	requestP('http://food2fork.com/api/search?key='+key+'&q='+query,function(err,res,body){
			
	// 	}).then(function(data) {
	// 		res.send(data)
	// 	})
	// })


	// app.get('/api/id',function(req,res) {
	// 		res.send(res.data)
	// 	})

	// app.post('/api/id',function(req,res) {
	// 	var key = '3e9166ad629eca6587a5e501e4e30961'
	// 	var ID = req.body.ID
	// 	requestP('http://food2fork.com/api/get?key='+key+'&rId='+ID,function(err,res,body){
	// 		console.log(body)
	// 	}).then(function(data) {
	// 		res.send(data)
	// 		console.log(JSON.stringify(data))
	// 	})
	// })


	app.post('/api/userRecipes',function(req,res) {
		var	ingredients = req.body.ingredients
		var description = req.body.description
		var ingredient_db = []
		var ingredient_id = []
		var description_id = []
		var description_db = []
	
		for(var i = 0; i < ingredients.length;i++) {
			console.log(ingredients[i].ingredients)
			if(ingredients[i].ingredients !== null && ingredients[i].ingredient !== null) {
			ingredient_db.push(ingredients[i].ingredients)
			ingredient_id.push(ingredients[i].ingredient)
			
		
		console.log(ingredient_db)
		console.log(ingredient_id)
			}
		}
		for(var j = 0; j < description.length; j++) {
			description_id.push(description[j].step)
			description_db.push(description[j].description)
		
	
		console.log(description_id)
		console.log(description_db)
			}
		knex('altered_recipes').insert({
			ingredient_ID:ingredient_id,
			ingredient:ingredient_db,
			description:description_db,
			description_ID:description_id})


		.then(function(data) {
			res.send(data)
		})
	
	})

	app.get('/api/userRecipes',function(req,res) {
			knex('altered_recipes').select('*').then(function(data) {
				res.send(JSON.stringify(data))
		})
	})



	app.use('/js',express.static(path.join(__dirname, './client/js')));
	app.use('/css',express.static(path.join(__dirname, './client/css')));
	app.use('/partials',express.static(path.join(__dirname, './client/partials')));

	var port = 3000

	app.listen(port,function() {
		console.log("it's all good on " + port)
	})