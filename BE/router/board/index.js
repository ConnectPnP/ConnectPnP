const express = require('express');
const fs = require('fs');
const router = express.Router();
const boardCtrl = require('./board.controller');

// 선택 글 보기, 게시글의 id
router.get('/details/:id',boardCtrl.getPost);

// 게시판 보기
router.get('/list/:page/:category',boardCtrl.getMore);
router.post('/listAll/:page',boardCtrl.getMoreWithoutCategory);

// 게시판 검색
router.post('/search/:page',boardCtrl.searchPost);
router.post('/searchUser', boardCtrl.searchUser);

// // post create edit delete
router.post('/', boardCtrl.create);
router.post('/files/:id', boardCtrl.uploadFile);

router.get('/', boardCtrl.getAllPost);

router.post('/edit/:id',boardCtrl.updatePost);
router.delete('/delete/:id',boardCtrl.deletePost);


router.post('/wait', boardCtrl.waitGroup);
router.post('/join', boardCtrl.joinGroup);
router.post('/cancel', boardCtrl.cancelGroup);
router.post('/exit', boardCtrl.exitGroup);
router.post('/check', boardCtrl.checkState);

// // comment create edit delete
router.get('/comments', boardCtrl.getAllComment);
router.post('/comments/:id',boardCtrl.createComment); // 게시글 id
router.post('/comments/:id/:comment',boardCtrl.updateComment);
router.delete('/comments/:id/:comment', boardCtrl.deleteComment);
// comment's reply
router.post('/reply/:id', boardCtrl.createCommentReply);
router.delete('/reply/:comment/:reply', boardCtrl.deleteCommentReply);

module.exports = router;