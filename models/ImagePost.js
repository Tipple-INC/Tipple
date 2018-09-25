const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const imagePostSchema = new Schema({
  wineName: String,
  vintage: String,
  region: String,
  score: Number,
  username: String,
  picName: String,
  picPath: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const ImagePost = mongoose.model('ImagePost', imagePostSchema);
module.exports = ImagePost;