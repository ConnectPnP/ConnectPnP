const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

/**
 * @module chatRoom
 * @description 채팅방
 */

const chatRoomSchema = new Schema({
   name:{type:String},
    host:{type:String},
    participants:{type:[String]},
    createdDate:{type:Date,default:Date.now()},
    newMessageReceivedDate: {type:Date,default: Date.now()}
});

autoIncrement.initialize(mongoose.connection);
chatRoomSchema.plugin(autoIncrement.plugin, 'ChatRoom');

const model = mongoose.model('ChatRoom', chatRoomSchema);

module.exports = model;
