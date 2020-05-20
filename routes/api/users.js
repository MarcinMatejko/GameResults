const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Game = require('../../models/Game');

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
  '/',
  [
    check('name', 'Imię jest wymagane').not().isEmpty(),
    check('email', 'Proszę podać prawidłowy adres email').isEmail(),
    check('password', 'Hasło musi zawierać minimum 6 znaków').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, players, userGames } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Podany użytkowanik już istnieje' }] });
      }

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        name,
        email,
        avatar,
        password,
        players,
        userGames,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/users/me
// @desc    Get Current User
// @access  Private

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id });

    if (!user) {
      return res.status(400).json({ msg: 'Nie ma takiego użytkownika' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd serwera');
  }
});

// @route   DELETE api/users
// @desc    Delete User
// @access  Private

router.delete('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await User.findOneAndRemove({ _id: req.user.id });

    return res.status(200).json({ msg: 'Użytkownik usunięty' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd serwera');
  }
});

// @route   POST api/users/players
// @desc    Add a player
// @access  Private

router.post(
  '/players',
  [auth, [check('playerName', 'Imię gracza jest wymagane').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById({ _id: req.user.id });

      const newPlayer = {
        playerName: req.body.playerName,
        age: req.body.age,
        color: req.body.color,
      };

      user.players.unshift(newPlayer);

      await user.save();

      res
        .status(201)
        .json(user.players[0])
        .send(`Utworzono gracza ${req.body.playerName}`);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Błąd serwera');
    }
  }
);

// @route   GET api/users/players
// @desc    Get all players of a user
// @access  Private

router.get('/players', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById({ _id: req.user.id });

    if (user.players.length === 0) {
      return res
        .status(404)
        .json({ msg: 'Ten użytkownik nie posiada żadnych graczy.' });
    }
    res.status(200).json(user.players);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd serwera');
  }
});

// @route   DELETE api/users/players/:player_id
// @desc    Delete a player
// @access  Private

router.delete('/players/:player_id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById({ _id: req.user.id });

    user.players = user.players.filter(
      (player) => player._id.toString() !== req.params.player_id
    );

    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd serwera');
  }
});

// @route   POST api/users/userGames
// @desc    Create and add new game to userGames
// @access  Private
router.post(
  '/userGames',
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
      const user = await User.findById({ _id: req.user.id });

      if (game) {
        return res.status(400).json({
          errors: [
            {
              msg:
                'Podany tytuł jest już w naszej bazie. Możesz dodać go do Twoich gier, z głównej Listy z Grami.',
            },
          ],
        });
      }

      const NewUserGame = {
        title,
        minPlayers,
        maxPlayers,
        minAge,
      };

      user.userGames.unshift(NewUserGame);

      await user.save();
      res.json(NewUserGame);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Błąd serwera');
    }
  }
);

// @route   GET api/users/userGames
// @desc    Get all userGames
// @access  Private

router.get('/userGames', auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id });

    if (user.userGames.length === 0) {
      return res
        .status(404)
        .json({ msg: 'Ten użytkownik nie posiada żadnych ulubionych gier.' });
    }

    user.userGames.sort(function (a, b) {
      if (a.title.toUpperCase() < b.title.toUpperCase()) {
        return -1;
      }
      if (a.title.toUpperCase() > b.title.toUpperCase()) {
        return 1;
      }
      return 0;
    });

    res.status(200).json(user.userGames);
  } catch (err) {
    return res.status(500).json('Błąd serwera');
  }
});

// @route    GET api/games/:id
// @desc     Get userGame by ID
// @access   Private
router.get('/userGames/:id', auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id });

    const game = user.userGames.find((game) => game.id === req.params.id);

    if (!game) {
      return res.status(404).json({ msg: 'Nie ma takiej gry' });
    }

    return res.status(200).json(game);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Nie znaleziono takiej gry.' });
    }
    res.status(500).send('Błąd serwera');
  }
});

// @route   DELETE api/users/userGames/:id
// @desc    Delete a game from userGames
// @access  Private

router.delete('/userGames/:id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findById({ _id: req.user.id });

    user.userGames = user.userGames.filter(
      (game) => game._id.toString() !== req.params.id
    );

    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd serwera');
  }
});

// @route   POST api/users/results
// @desc    Add new result
// @access  Private

router.post(
  '/results/:id',

  auth,
  [
    check('players', 'Dodanie graczy jest wymagane').not().isEmpty(),
    check('whoWin', 'Podanie zwycięzcy jest wymagane').not().isEmpty(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const game = await Game.findById(req.params.id);

    const newResult = {
      game: game,
      players,

      whoWin: req.body,
    };

    try {
      const user = await User.findById(req.user.id).select('-password');

      user.results.unshift(newResult);

      await user.save();

      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Błąd serwera');
    }
  }
);

module.exports = router;
