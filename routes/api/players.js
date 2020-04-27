const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Player = require('../../models/Player');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route   GET api/players
// @desc    Get players
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const players = await Player.findOne({ user: req.user.id });

    if (!players) {
      return res
        .status(400)
        .json({ msg: 'Ten użytkownik nie posiada żadnych graczy' });
    }

    res.json(players);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd serwera');
  }
});

// @route   POST api/players
// @desc    Create or update user players
// @access  Private

router.post(
  '/',
  [auth, [check('name', 'Imię gracza jest wymagane').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, age } = req.body;

    // Build a player
    const playerFields = {};
    playerFields.user = req.user.id;
    if (name) playerFields.name = name;
    if (age) playerFields.age = age;

    try {
      let player = await Player.findOne({ user: req.user.id });

      if (player) {
        // Update
        player = await Player.findByIdAndUpdate(
          { user: req.user.id },
          { $set: player },
          { new: true }
        );

        return res.json(player);
      }

      // Create
      player = new Player(playerFields);

      await player.save();
      res.json(player);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Błąd serwera');
    }
  }
);
module.exports = router;
