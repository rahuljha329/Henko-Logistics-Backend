const express = require("express");
const router = express.Router();
const { protectUser } = require('../middleware/authUser');
const { createHomePage ,getHomePage ,deleteHomePage} = require("../controller/homePage");
const upload = require("../middleware/uploads");

router.post("/create-homePage", protectUser, upload.single("image", 1), createHomePage);
router.get("/get-homePage", getHomePage);
router.delete("/delete-homePage", protectUser, deleteHomePage);

module.exports = router;
