const db = require('../db/knex.js');
const single = 'genre';
const plural = 'genres';

const Genres = function() {
  return db('genres');
}

function create(req, res, next) {
  Genres().insert({ name: req.body.name }).then(() => {
    res.status(200).json({
      status: 'success',
      message: `Inserted ONE ${single}`
    });
  }).catch(err => next(err));
}

class read {
  all(req, res, next) {
    Genres().select().where({deleted: false}).then(data => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: `Retrieved ALL ${plural}`
      });
    }).catch(err => next(err));
  }

  one(req, res, next) {
    let id = parseInt(req.params.id);
    Genres().select().where({id: id}).then(data => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: `Retrieved ONE ${single}`
      });
    }).catch(err => next(err));
  }
};

function update(req, res, next) {
  let id = parseInt(req.params.id);
  let name = req.body.name;
  Genres().update({name: name}).where({id: id}).then(() => {
    res.status(200).json({
      status: 'success',
      message: `Update ${single}`
    });
  }).catch(err => next(err));
}

function remove(req, res, next) {
  let id = parseInt(req.params.id);
  Genres().update({deleted: true}).where({id: id}).then(result => {
    res.status(200).json({
      status: 'success',
      message: `Removed ${result.rowCount} ${single}`
    })
  }).catch(err => next(err));
}

class search {
  name(req, res, next) {
    Genres().select().where('name', 'like', `%${req.params.name}%`).then(data => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: `Retrieved results for search ${req.params.name}`
      });
    }).catch(err => next(err));
  }
}

module.exports = {
  create: create,
  read: new read(),
  update: update,
  remove: remove,
  search: new search()
};
