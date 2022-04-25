const express = require("express");
const { getCustomerDetails, getdish1 } = require("../controllers/admin");


const router = express.Router();

router.get('/getCustomerDetails',getCustomerDetails);
router.get('/getdish1',getdish1);

module.exports = router;
