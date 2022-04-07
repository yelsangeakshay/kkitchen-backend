const express = require('express')
const { create,getmenu,getdish }  = require('../controllers/menu')

const router = express.Router();

const { userId } = require('../controllers/user');
router.post('/:userid/createmenu',create)
router.get('/getmenu',getmenu);
router.get('/getdish',getdish);

router.param('userid',userId);

module.exports = router