const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

/**
 * @module chatMessage
 * @description 채팅방 메세지
 */

const chatMessageSchema = new Schema({
    author: {type: Number, required: true, ref:'User'},
    content: {type: String, required: true},
    dest: {type: String,required:true},
    group: {type: Boolean},
    type: {type: String},
    time: {type: Date, default: Date.now()}
});

autoIncrement.initialize(mongoose.connection);
chatMessageSchema.plugin(autoIncrement.plugin, 'ChatMessaeg');

const model = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = model;
