const express = require('express');
const router = express.Router();
const categoryCtrl = require('./category.controller');


// 대분류 카테고리 CRUD
router.post('/', categoryCtrl.createCategory);

router.get('/', categoryCtrl.getAllCategory);

router.post('/edit/:id',categoryCtrl.updateCategory);

router.delete('/delete/:id',categoryCtrl.deleteCategory);


// 소분류 카테고리 CRUD
router.post('/:cat/sub', categoryCtrl.createSubCategory);

router.get('/:cat/sub/:id', categoryCtrl.getSubCategory);

router.post('/:cat/sub/edit/:id',categoryCtrl.updateSubCategory);

router.delete('/:cat/sub/delete/:id',categoryCtrl.deleteSubCategory);

module.exports = router;
