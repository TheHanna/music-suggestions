const express = require('express');
const router = express.Router();
const genre = require('./genres/routes');
const band = require('./bands/routes');

router.use('/', genre);
router.use('/', band);

module.exports = router;
