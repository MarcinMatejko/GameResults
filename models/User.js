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
  games: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'game',
  },
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
