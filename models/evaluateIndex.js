const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

/**
* @module evaluate_index
* @description 평가 지표
*/

const EvaluateSchema = new Schema({
    name: { type: String },
    description: {type: String}
});

EvaluateSchema.plugin(autoIncrement.plugin, 'Evaluate');


const model = mongoose.model('Evaluate', EvaluateSchema);

module.exports = model;
