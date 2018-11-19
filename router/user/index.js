// /api/user/

const express = require('express');
const router = express.Router();
const userCtrl = require('./user.controller');

// create user
router.post('/',userCtrl.create);

// get user info
router.get('/details/:id',userCtrl.getUser);

// make & edit profile by user code
router.post('/profile/:id', userCtrl.editProfile);
router.post('/profile/files/:id', userCtrl.uploadAvatar); // profile photo


module.exports = router;
