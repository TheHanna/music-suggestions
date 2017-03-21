const db = require('../db/knex.js');
const single = 'band';
const plural = 'bands';

const Bands = function() {
  return db('bands');
}

function create(req, res, next) {
  Bands().insert({ name: req.body.name, genres: req.body.genres }).then(() => {
    res.status(200).json({
      status: 'success',
      message: `Inserted ONE ${single}`
    });
  }).catch(err => next(err));
}

class read {
  all(req, res, next) {
    db.raw('SELECT bands.id, bands.name, json_agg(g.name) AS genres FROM (SELECT id, name FROM genres) AS g, bands WHERE g.id=ANY(bands.genres) AND bands.deleted=false GROUP BY bands.id ORDER BY bands.id ASC;')
      .then(data => {
        res.status(200).json({
          status: 'success',
          data: data.rows,
          message: `Retrieved ALL ${plural}`
        });
      }).catch(err => next(err));
  }

  one(req, res, next) {
    let id = parseInt(req.params.id);
    db.raw('SELECT bands.id, bands.name, json_agg(g.name) AS genres FROM (SELECT id, name FROM genres) AS g, bands WHERE g.id=ANY(bands.genres) AND bands.deleted=false AND bands.id=? GROUP BY bands.id ORDER BY bands.id ASC;', [id])
      .then(data => {
        res.status(200).json({
          status: 'success',
          data: data.rows,
          message: `Retrieved ONE ${single}`
        });
      }).catch(err => next(err));
  }
};

function update(req, res, next) {
  let values = [req.body.name, req.body.genres, parseInt(req.params.id)];
  Bands().update({
    name: req.body.name,
    genres: req.body.genres,
  }).where('id', parseInt(req.params.id))
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: `Updated ${single}`
      });
    }).catch(err => next(err));
}

function remove(req, res, next) {
  let id = parseInt(req.params.id);
  Bands().update({ deleted: true }).where('id', id).then(result => {
    res.status(200).json({
      status: 'success',
      message: `Removed ${result.rowCount} ${single}`
    });
  }).catch(err => next(err));
}

class search {
  name(req, res, next) {
    Bands().select().where('name', 'like', `%${req.params.name}%`).then(data => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: `Retrieved results for search ${req.params.name}`
      });
    }).catch(err => next(err));
  }

  genre(req, res, next) {
    Bands().select().whereRaw(req.params.genre + '=ANY(genres)').then(data => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: `Retrieved results for search ${req.params.genre}`
      });
    })
  }
}

module.exports = {
  create: create,
  read: new read(),
  update: update,
  remove: remove,
  search: new search()
};
