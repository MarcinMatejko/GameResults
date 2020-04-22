const express = require('express');
const router = express.Router();

// @route   GET api/games
// @desc    Test Route
// @access  Public
router.get('/', (req, res) => res.send('games route'));

module.exports = router;
