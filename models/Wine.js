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
  imgName: {type: String, default: "bottle_with_glass"},
  imgPath: {type: String, default: "/images/bottle_with_glass.jpg"}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Wine = mongoose.model('Wine', wineSchema);
module.exports = Wine;
