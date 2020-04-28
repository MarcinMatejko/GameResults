const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Player = require('../../models/Player');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route   POST api/players
// @desc    Create a player
// @access  Private
router.post(
  '/',
  [auth, [check('playerName', 'Imię gracza jest wymagane').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const NewPlayer = new Player({
        playerName: req.body.playerName,
        userName: user.name,
        age: req.body.age,
        color: req.body.color,
        user: req.user.id,
      });

      const player = await NewPlayer.save();

      res.json(player);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Błąd serwera');
    }
  }
);

module.exports = router;
