const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const imagePostSchema = new Schema({
  wineName: String,
  vintage: String,
  region: String,
  score: Number,
  username: String,
  picName: {type: String, default: "bottle_with_glass"},
  picPath: {type: String, default: "/images/bottle_with_glass.jpg"}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const ImagePost = mongoose.model('ImagePost', imagePostSchema);
module.exports = ImagePost;