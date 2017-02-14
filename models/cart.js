'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  uerId: String,
  items: [{
    item: {
      type: Schema.ObjectId,
      ref: 'Item'
    },
    count: Number
  }]
});

module.exports = mongoose.model('Cart', cartSchema);