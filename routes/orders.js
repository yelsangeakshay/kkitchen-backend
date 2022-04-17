const express = require("express");
const { create,getOrderHistory,getChefCurentOrders,getOrderHistoryChef,getOrderHistory1 } = require("../controllers/orders");
const router = express.Router();

const { userId,addOrderToUserHistory } = require('../controllers/user');
const { menuId } = require('../controllers/menu');

router.post('/order/create/:userid/:menuid',create);
router.post('/order',addOrderToUserHistory);
router.get('/getorderhistory',getOrderHistory1);
router.get('/getchefcurrentorders',getChefCurentOrders);
router.get('/getorderhistorychef',getOrderHistoryChef);

router.param('userid',userId);
router.param('menuid',menuId);
module.exports = router;
