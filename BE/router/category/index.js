const express = require('express');
const router = express.Router();
const categoryCtrl = require('./category.controller');


// 대분류 카테고리 CRUD
router.post('/', categoryCtrl.createCategory);

router.get('/', categoryCtrl.getAllCategory);

router.post('/edit/:id',categoryCtrl.updateCategory);

router.delete('/delete/:id',categoryCtrl.deleteCategory);


// 소분류 카테고리 CRUD
router.post('/sub', categoryCtrl.createSubCategory);

router.get('/sub/:id', categoryCtrl.getSubCategory);

router.post('/sub/edit/:id',categoryCtrl.updateSubCategory);

router.delete('/sub/delete/:id',categoryCtrl.deleteSubCategory);

module.exports = router;
