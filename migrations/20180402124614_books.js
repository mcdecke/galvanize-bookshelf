

exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', (table) => {
    table.increments('id')
    table.varchar('title', 255).defaultTo('').notNullable()
    table.varchar('author', 255).defaultTo('').notNullable()
    table.varchar('genre', 255).defaultTo('').notNullable()
    table.text('description').notNullable().defaultTo('')
    table.text('cover_url').notNullable().defaultTo('')
    table.timestamp('created_at', false).notNullable().defaultTo(knex.raw('now()'))
    table.timestamp('updated_at', false).notNullable().defaultTo(knex.raw('now()'))
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books')
};
