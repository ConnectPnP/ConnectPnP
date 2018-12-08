const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

/**
* @module category
* @description 모임 카테고리 종류
*/

const CategorySchema = new Schema({
    name: { type: String },
    img_path : {type: String},
    sub_category : [ {type: Number, ref: 'Category'} ],
    depth : {type : Number, default: 0}
});


CategorySchema.plugin(autoIncrement.plugin, 'Category');


const model = mongoose.model('Category', CategorySchema);

module.exports = model;
