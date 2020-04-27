const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
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
});

module.exports = Game = mongoose.model('game', GameSchema);
