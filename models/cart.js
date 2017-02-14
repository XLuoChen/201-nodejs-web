'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({items: Array});

module.exports = mongoose.model('Cart', cartSchema);