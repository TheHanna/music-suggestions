
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bands').del()
    .then(function () {
      // Inserts seed entries
      return knex('bands').insert([
        { name: 'Black Sabbath', genres: [1] },
        { name: 'Metallica', genres: [1, 2] }
      ]);
    });
};
