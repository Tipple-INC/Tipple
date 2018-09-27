const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const quoteSchema = new Schema({
  author: String,
  quote: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;