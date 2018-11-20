const express = require('express');
const fs = require('fs');
const router = express.Router();
const boardCtrl = require('./board.controller');

// 선택 글 보기, 게시글의 id
router.get('/details/:id',boardCtrl.getPost);

// 유저 아이디로 보기, User_code
router.get('/log/:user_code/:page', boardCtrl.getLog);

// 게시판 보기
router.get('/list/:page',boardCtrl.getMore);

// 게시판 검색
router.post('/search/:type',boardCtrl.searchPost);

// post create edit delete
router.post('/', boardCtrl.create);
router.post('/files/:id', boardCtrl.uploadFile);
router.post('/edit/:id',boardCtrl.updatePost);
router.delete('/delete/:id',boardCtrl.deletePost);

// comment create edit delete
router.post('/comments/:id',boardCtrl.createComment); // 게시글 id
router.post('/comments/:id/:comment',boardCtrl.updateComment);
router.delete('/delete/:id/:comment', boardCtrl.deleteComment);


// get keyword dataset
router.get('/admin/keyword',boardCtrl.getBoardForAdmin);
module.exports = router;