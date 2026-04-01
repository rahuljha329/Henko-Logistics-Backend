const express = require("express");
const router = express.Router();
const { protectUser } = require('../middleware/authUser');
const { createFAQ } = require("../controller/faq");

router.post("/create-faq", protectUser, createFAQ);

module.exports = router;
