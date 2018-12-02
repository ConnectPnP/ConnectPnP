// /api/user/

const express = require('express');
const router = express.Router();
const userCtrl = require('./user.controller');




// create user
router.post('/',userCtrl.create);
//유저로 등록되어 있는지 확인
router.get('/:id',userCtrl.findUser)
// get user info . 유저 아이디로 정보 불러오기
router.get('/details/:id',userCtrl.getUser);

// make & edit profile by user code
router.post('/profile/:id', userCtrl.editProfile);
router.post('/profile/files/:id', userCtrl.uploadAvatar); // profile photo


module.exports = router;
