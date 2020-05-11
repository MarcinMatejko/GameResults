const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

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

module.exports = router;
