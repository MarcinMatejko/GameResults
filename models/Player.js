const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  playerName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
  },
  age: {
    type: Number,
  },
  color: {
    type: String,
  },
});

module.exports = Player = mongoose.model('player', PlayerSchema);
