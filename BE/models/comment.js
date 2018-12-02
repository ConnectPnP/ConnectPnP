const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

/**
* @module comment
* @description 댓글 정보
*/

const CommentSchema = new Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId, ref:'User'},
    context : {type: String},
    depth : {type: Number},
    parent_id : {type : mongoose.Schema.Types.ObjectId, ref:'Comment'}
});

CommentSchema.plugin(autoIncrement.plugin, 'Comment');


const model = mongoose.model('Comment', CommentSchema);

module.exports = model;
