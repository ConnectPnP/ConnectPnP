const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

/**
* @module user
* @description contain the details of user info
*/

const UserSchema = new Schema({
  user_code: { type: String, required: true },
  avatar_path: {type: String },
  name: { type: String },
  password : { type : String },
  star_rate : {type : Number },
  rating_status : [{
    status_id : {type : mongoose.Schema.Types.ObjectId, ref:'Evaluate' },
    percentage : {type : Number}
  }],
  group_log : [{
    group_id : {type : mongoose.Schema.Types.ObjectId, ref:'Group'},
    review_popup : {type : Boolean }
  }],
  chat : [{
    chat_id : {type : mongoose.Schema.Types.ObjectId, ref:'Chat'}
  }]
});

UserSchema.plugin(autoIncrement.plugin, 'User');


const model = mongoose.model('User', UserSchema);

module.exports = model;
