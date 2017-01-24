'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cart = new Schema({cartId: String, items: Array});

module.exports = mongoose.model('Cart', cart);