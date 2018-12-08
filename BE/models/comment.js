const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

/**
* @module comment
* @description 댓글 정보
*/

const CommentSchema = new Schema({
    member : {type : Number, ref: 'User'},
    content : {type: String},
    depth : {type: Number},
    childParent : {type : [Number], ref: 'Comment'},
    createdAt : {type: Date, default: Date.now}
});

CommentSchema.plugin(autoIncrement.plugin, 'Comment');


const model = mongoose.model('Comment', CommentSchema);

module.exports = model;
