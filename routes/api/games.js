const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Game = require('../../models/Game');
const User = require('../../models/User');

// @route   POST api/games
// @desc    Create new game
// @access  Private
router.post(
  '/',
  auth,
  [
    check('title', 'Tytuł gry jest wymagany').not().isEmpty(),
    check('minPlayers', 'Podaj minimalną ilość graczy. Minimum 1').isInt({
      allow_leading_zeroes: false,
      gt: 0,
    }),
    check('maxPlayers', 'Podaj maksymalną ilość graczy. Miminum 1').isInt({
      allow_leading_zeroes: false,
      gt: 0,
    }),
    check('minAge', 'Podaj minimalny wiek dla gracza. Mimimum 1').isInt({
      allow_leading_zeroes: false,
      gt: 0,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, minPlayers, maxPlayers, minAge } = req.body;

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
        minAge,
      });

      await game.save();
      res.json(game);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Błąd serwera');
    }
  }
);

// @route   POST api/games/:id
// @desc    Add Game from Games to userGames
// @access  Private
router.post('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id });
    const game = await Game.findById({ _id: req.params.id });

    user.userGames.unshift(game);

    await user.save();
    res.json(game);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd serwera');
  }
});

// @route   GET api/games/
// @desc    Get all games
// @access  Private

router.get('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const games = await Game.find();

    res.status(200).json(games);
  } catch (err) {
    return res.status(500).json('Błąd serwera');
  }
});

// @route    GET api/games/:id
// @desc     Get game by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ msg: 'Nie ma takiej gry' });
    }
    res.json(game);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Nie znaleziono takiej gry.' });
    }
    res.status(500).send('Błąd serwera');
  }
});

// @route   DELETE api/games/:id
// @desc    Delete a game
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let game = await Game.findById({ _id: req.params.id });

    if (!game) {
      return res
        .status(400)
        .json({ errors: [{ msg: `Dana gra nie istnieje.` }] });
    }
    const { title } = game;

    await game.remove();

    return res.status(200).json({ msg: `Gra ${title} usunięta` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd serwera');
  }
});

module.exports = router;
