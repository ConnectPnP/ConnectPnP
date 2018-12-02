const router = require('express').Router();
const board = require('./board');
const user = require('./user');
const category = require('./category');

router.use('/board', board);
router.use('/user', user);
router.use('/category', category);
module.exports = router;
