const express = require('express');
const router = express.Router();
const categoryCtrl = require('./category.controller');


// 대분류 카테고리 CRUD
router.post('/', categoryCtrl.createCategory);

router.get('/', categoryCtrl.getAllCategory);

router.post('/edit/:id',categoryCtrl.updateCategory);

router.delete('/delete/:id',categoryCtrl.deleteCategory);

router.get('/list/:page', categoryCtrl.getMoreCategory);

router.post('/files/:id', categoryCtrl.uploadImage);

// 소분류 카테고리 CRUD
router.get('/sub', categoryCtrl.getAllSubCategory);

router.post('/:cat/sub', categoryCtrl.createSubCategory);

router.post('/:cat/sub/delete/:id',categoryCtrl.deleteSubCategory);

module.exports = router;