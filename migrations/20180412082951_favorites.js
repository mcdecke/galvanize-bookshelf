
exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', (table) => {
    table.increments('id')
    table.integer('user_id').references('users.id').notNullable().onDelete('cascade')
    table.integer('book_id').references('books.id').notNullable().onDelete('cascade')
    table.timestamp('created_at', false).notNullable().defaultTo(knex.raw('now()'))
    table.timestamp('updated_at', false).notNullable().defaultTo(knex.raw('now()'))
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites')
};
