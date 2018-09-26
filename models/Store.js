const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const storeSchema = new Schema({
  ownerID: String,
  storename: String,
  direction1: String,
  direction2: String,
  city: String,
  zip: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Store = mongoose.model('Store', storeSchema);
module.exports = Store;
