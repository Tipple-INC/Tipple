const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const wineSchema = new Schema({
  creatorId: String,
  wineName: String,
  color: String,
  vintage: String,
  region: String,
  rating: Number,
  price: String,
  imgName: String,
  imgPath: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Wine = mongoose.model('Wine', wineSchema);
module.exports = Wine;
