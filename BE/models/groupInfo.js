const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

/**
 * @module group_info
 * @description 모임 정보
 */

const GroupSchema = new Schema({
    category: {type: Number, ref: 'Category'},
    subCategory: {type: Number, ref: 'Category'},
    title: {type: String},
    detail: {type: String},
    conditions: {gender: {type: String}, age: [{type: Number}]},
    hits: {type: Number, default: 1},
    applicants: {type: Number, default: 0},
    due_date: {type: String},
    start_date: {type: String},
    meeting_date: {type: String},
    min_num: {type: Number},
    max_num: {type: Number},
    cost: {type: String},
    images: [{type: String}],
    location: {
        title: {type: String},
        latlng: {lat: {type: String}, lng: {type: String}},
        url: {type: String}
    },
    host: {type: String},
    comments: [
        {type: Number, ref: 'Comment'}
    ],
    guest: [
        {type: Number, ref: 'User'}
    ]
});

GroupSchema.plugin(autoIncrement.plugin, 'Group');


const model = mongoose.model('Group', GroupSchema);

module.exports = model;
