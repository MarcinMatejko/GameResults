const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Game = require('../../models/Game');

// @route   POST api/games
// @desc    Create new game
// @access  Public
router.post(
  '/',
  [
    check('title', 'Tytuł gry jest wymagany').not().isEmpty(),
    check('minPlayers', 'Podaj minimalną ilość graczy. Minimum 1').isInt({
      allow_leading_zeroes: false,
      gt: 1,
    }),
    check('maxPlayers', 'Podaj maksymalną ilość graczy. Miminum 1').isInt({
      allow_leading_zeroes: false,
      gt: 1,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { title, minPlayers, maxPlayers } = req.body;

    try {
      let game = await Game.findOne({ title });

      if (game) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Podany tytuł już istnieje.' }] });
      }

      game = new Game({
        title,
        minPlayers,
        maxPlayers,
      });

      await game.save();
      res.send(`Gra ${title} dodana do bazy`);
    } catch (err) {
      console.errorr(err.message);
      res.status(500).send('Błąd serwera');
    }
  }
);

module.exports = router;
