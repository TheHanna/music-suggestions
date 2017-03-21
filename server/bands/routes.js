const express = require('express');
const router = express.Router();
const band = require('../bands/model');

router.post('/api/bands', band.create);
router.get('/api/bands', band.read.all);
router.get('/api/bands/:id', band.read.one);
router.get('/api/bands/name/:name', band.search.name);
router.get('/api/bands/genre/:genre', band.search.genre);
router.put('/api/bands/:id', band.update);
router.delete('/api/bands/:id', band.remove);

module.exports = router;
