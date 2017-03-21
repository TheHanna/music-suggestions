
exports.up = function(knex, Promise) {
  return knex.schema.createTable('genres', table => {
    table.increments();
    table.string('name').notNullable();
    table.boolean('deleted').defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('genres');
};
