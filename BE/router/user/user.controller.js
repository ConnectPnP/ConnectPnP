const fs = require('fs');
const path = require('path');
const User  = require('../../models/user');
const upload = require('../../middlewares/uploadAvatar');
const config = require('../../config/server.config');

/*
// 회원 생성
exports.create = (req, res) => {
// user code가 이미 서버 디비에 존재하는지 확인 : 없다면 생성, 있다면 패스
  User.find({user_code : req.body.user_code}, function (err, user) {
    if(err) return res.json({});
    else if(user == '') {
      User.create(req.body, (err, result) => {
        if(!err) {
          return  res.json({result : "ok"});
        }
      }); // 존재하지 않는 회원 id는 새로 생성.
    }
    else {
      return res.json({result : "exist"});
    }
  });
};
*/

// 회원 생성
exports.create = (req, res) => {
// user code가 이미 서버 디비에 존재하는지 확인 : 없다면 생성, 있다면 패스
    console.log(req.body);
    console.log("/signUp post received>>")
};


exports.getUser = (req, res) => {
  User.find({user_code : req.params.id}, (err, result) => {
    if(!err) {
      return res.json(result);
    }
    return res.json({result : "fail"});
  })
}

exports.delete = (req, res) => {
  User.findOneAndRemove({_id: req.params.id}, (err, result) => {
    if(!err) {
    return res.json({result : "ok"});
  }
  return res.json({result : "fail"});
  });
}
// 회원 프로필 관리

// user_code를 조회하여 해당 회원 프로필 변경하기
exports.editProfile = (req, res) => {
  User.findOneAndUpdate(
    {user_code: req.params.id}, { $set:req.body }, (err, result) => {
      if(!err) {
        return res.json(result);
      }
      else return res.json({ result : "fail"});
    });
};

// user_code를 조회하여 해당 회원 프로필 사진 path 변경해주기
//api/user/profile/files/id

exports.uploadAvatar = (req, res) => {
  upload(req, res)
    .then((files) => {
      User.where({user_code : req.params.id})
      .update({ $set : {avatar_path: `${config.serverUrl()}files/${req.files.avatarFile[0].destination.match(/[^/]+/g).pop()}/${req.files.avatarFile[0].filename}` }}).exec()
      .then(() => {
        User.find({user_code : req.params.id}, (err, result) => {
          if (err) return res.json({});
          return res.json(result);
        });
      })
      .catch((err) => {
        return res.json({result : "fail"});
      });
    })
    .catch((err) => {
      res.status(500).send('Upload middlewares error');
    });
};
