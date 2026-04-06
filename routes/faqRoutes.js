const express = require("express");
const router = express.Router();
const { protectUser } = require('../middleware/authUser');
const { createFAQ, getAllFAQ ,updateFAQ ,deleteFAQ} = require("../controller/faq");

router.post("/create-faq", protectUser, createFAQ);
router.get("/get-allFAQ", getAllFAQ);
router.put("/update-faq", protectUser, updateFAQ);
router.delete("/delete-faq", protectUser, deleteFAQ);

module.exports = router;