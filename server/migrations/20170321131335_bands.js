
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bands', table => {
    table.increments();
    table.string('name').notNullable();
    table.specificType('genres', 'integer[]');
    table.boolean('deleted').defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bands');
};
