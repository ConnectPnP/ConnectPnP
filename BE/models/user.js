const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
//const { mongoose, autoIncrement } = require('models/mongo');
const Schema = mongoose.Schema;

/**
* @module user
* @description contain the details of user info
*/


const UserSchema = new Schema({
  user_code: { type: String, required: true },
  admin :{type:Boolean},
  avatar_path: {type: String },
  name: { type: String },
  nickName: { type: String },
  age:{ type: Number},
  gender:{type: String},
  categoryList:[],
  star_rate : {type : Number, default: 0},
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
