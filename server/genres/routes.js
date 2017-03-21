const express = require('express');
const router = express.Router();
const genre = require('../genres/model');

router.post('/api/genres', genre.create);
router.get('/api/genres', genre.read.all);
router.get('/api/genres/:id', genre.read.one);
router.get('/api/genres/name/:name', genre.search.name);
router.put('/api/genres/:id', genre.update);
router.delete('/api/genres/:id', genre.remove);

module.exports = router;
