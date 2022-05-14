const express = require('express')
const { create,getmenu,getdish,getAllMenus,photo,menuId,getAllMenus1 }  = require('../controllers/menu')

const router = express.Router();

const { userId } = require('../controllers/user');
router.post('/:userid/createmenu',create)
router.get('/getmenu',getmenu);
router.get('/getdish',getdish);
router.get('/getmenulist',getAllMenus);
router.get('/getmenulist1',getAllMenus1);
router.get('/menu/photo/:menuId',photo);

router.param('userid',userId);
router.param('menuId',menuId);

module.exports = router