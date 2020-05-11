const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  userGames: [
    {
      title: {
        type: String,
        required: true,
      },
      minPlayers: {
        type: Number,
        required: true,
      },
      maxPlayers: {
        type: Number,
        required: true,
      },
      minAge: {
        type: Number,
        required: true,
      },
    },
  ],
  players: [
    {
      playerName: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
      },
      color: {
        type: String,
      },
    },
  ],
});

module.exports = User = mongoose.model('user', UserSchema);
