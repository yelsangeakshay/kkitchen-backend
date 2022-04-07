const express = require("express");
const { getChef, getLocation } = require("../controllers/user");
const router = express.Router();

router.get('/getchef',getChef);
router.get('/getlocation',getLocation)
module.exports = router;
