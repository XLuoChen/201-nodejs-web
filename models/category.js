'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const category = new Schema({id: String, category: String});

module.exports = mongoose.model('Category', category);