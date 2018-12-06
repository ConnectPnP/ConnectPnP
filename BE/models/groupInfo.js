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
 detail : {type: String},
 due_date : {type: String},
 start_date : {type : String},
 meeting_date : {type : String},
 min_num : {type: Number},
 max_num : {type: Number},
 cost : {type : String},
 condition : {type : String},
 images : [{img_path : {type:String}, name : {type: String}}],
 location : {type: String},
 host : {type : mongoose.Schema.Types.ObjectId, ref:'User'},
 comments : [
   {
      member : {type : mongoose.Schema.Types.ObjectId, ref:'User'},
      content : {type: String},
      depth : {type: Number},
      parentComment : {type : mongoose.Schema.Types.ObjectId, ref:'Comment'},
      createdAt : {type: Date, default: Date.now}
  }
],
 guest: [
    {type : mongoose.Schema.Types.ObjectId, ref:'User'}
 ]
});

GroupSchema.plugin(autoIncrement.plugin, 'Group');


const model = mongoose.model('Group', GroupSchema);

module.exports = model;