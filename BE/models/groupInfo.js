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
    title: {type: String, text :true},
    detail: {type: String, text :true},
    conditions: {gender: {type: String}, age: [{type: Number}]},
    hits: {type: Number, default: 1},
    applicants: {type: Number, default: 0},
    due_date: {type: String},
    start_date: {type: String},
    meeting_date: {type: String},
    min_num: {type: Number},
    max_num: {type: Number},
    cost: {type: String, text :true},
    images: [{type: String}],
    location: {
        title: {type: String, text :true},
        latlng: {lat: {type: String}, lng: {type: String}},
        url: {type: String}
    },
    host: {type: Number, ref:'User'},
    comments: [
        {type: Number, ref: 'Comment'}
    ],
    guest: [
        {type: Number, ref: 'User'}
    ],
    waiting : [
        {type : Number, ref: 'User'}
    ]
});

GroupSchema.plugin(autoIncrement.plugin, 'Group');


const model = mongoose.model('Group', GroupSchema);

module.exports = model;
