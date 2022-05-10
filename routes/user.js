const express = require("express");
const { getChef, getLocation,getProfile,update,getCustomerDetails,getChefDetails,getChefReport } = require("../controllers/user");
const { userId } = require('../controllers/user');
const router = express.Router();

router.get('/getchef',getChef);
router.get('/getlocation',getLocation);
router.get('/getprofile',getProfile);
router.get('/getCustomerDetails',getCustomerDetails);
router.get('/getChefDetails',getChefReport);

router.put("/user", update);
router.param('userId',userId);
module.exports = router;
