
exports.up = function(knex, Promise) {
	return Promise.all([
  knex.schema.createTable('all_recipes',function(table) {
  		table.increments()
  	  	table.string('title').notNullable()
  		table.string('ingredients').notNullable()
  		table.string('ingredient_id').notNullable()
  		table.string('description').notNullable()
  		table.string('recipe_id').notNullable()
  		table.string('img')
  	})
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTable('all_recipes')])
};
