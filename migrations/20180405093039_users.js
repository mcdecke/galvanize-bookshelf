exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.varchar('first_name', 255).defaultTo('').notNullable()
    table.varchar('last_name', 255).defaultTo('').notNullable()
    table.varchar('email', 255).notNullable()
    table.specificType('hashed_password', 'char(60)').notNullable()
    table.timestamp('created_at', false).notNullable().defaultTo(knex.raw('now()'))
    table.timestamp('updated_at', false).notNullable().defaultTo(knex.raw('now()'))
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};
