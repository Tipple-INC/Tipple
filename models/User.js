const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  role: { type: String, enum : ['GUEST', 'STOREOWNER'], default : 'GUEST' },
  wishlist: [{type: Schema.Types.ObjectId, ref:'Wine'}],
  imgName: {type: String, default: 'default-avatar.jpeg'},
  imgPath: {type: String, default: '/images/default-avatar.jpeg'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
