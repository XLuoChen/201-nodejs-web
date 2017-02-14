'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({cartId: String, items: Array});

module.exports = mongoose.model('Cart', cartSchema);