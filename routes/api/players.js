const express = require('express');
const router = express.Router();

// @route   GET api/players
// @desc    Test Route
// @access  Public
router.get('/', (req, res) => res.send('players route'));

module.exports = router;
