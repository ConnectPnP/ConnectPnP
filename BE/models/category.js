const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

/**
* @module category
* @description 모임 카테고리 종류
*/

const CategorySchema = new Schema({
    name: { type: String },
    description: {type: String}
});

CategorySchema.plugin(autoIncrement.plugin, 'Category');


const model = mongoose.model('Category', CategorySchema);

module.exports = model;
