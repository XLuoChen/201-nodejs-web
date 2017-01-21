'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const item = new Schema({id:Number,name: String, category: String});

module.exports = mongoose.model('Item', item);