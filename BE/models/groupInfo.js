const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

/**
* @module group_info
* @description 모임 정보
*/

const GroupSchema = new Schema({
 category_id : {type : mongoose.Schema.Types.ObjectId, ref:'Category'},
 title : {type : String},
 hits : {type: Number, default: 1},
 applicants : {type: Number, default: 0},
 due_date : {type: Date},
 start_date : {type : Date},
 meeting_date : {type : Date},
 min_num : {type: Number},
 max_num : {type: Number},
 cost : {type : Number},
 condition : {type : String},
 images : [{type:String}], //[{img_path : {type:String}}]
 location : {type: String},
 host : {type : mongoose.Schema.Types.ObjectId, ref:'User'},
 comments : [{
     comment_id : {type : mongoose.Schema.Types.ObjectId, ref:'Comment'}
 }],
 guest: [{
     user_id : {type : mongoose.Schema.Types.ObjectId, ref:'User'}
 }]
 
});

GroupSchema.plugin(autoIncrement.plugin, 'Group');


const model = mongoose.model('Group', GroupSchema);

module.exports = model;
