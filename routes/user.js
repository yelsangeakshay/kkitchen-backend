const express = require("express");
const { getChef, getLocation,getProfile } = require("../controllers/user");
const router = express.Router();

router.get('/getchef',getChef);
router.get('/getlocation',getLocation);
router.get('/getprofile',getProfile)
module.exports = router;
