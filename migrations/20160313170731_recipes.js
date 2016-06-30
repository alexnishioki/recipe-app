exports.up = function(knex, Promise) {
  return Promise.all([ 
  knex.schema.createTable('altered_recipes',function(table) {
  table.string('description_ID')
        table.string('description')
  table.string('ingredient_ID')
  table.string('ingredient')
  table.string('img')

  })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.schema.dropTable('description_ID')])
};
