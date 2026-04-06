const express = require("express");
const router = express.Router();
const { protectUser } = require('../middleware/authUser');
const { createAboutUs ,getAboutUs ,deleteAboutUs} = require("../controller/aboutUs");
const upload = require("../middleware/uploads");

router.post("/create-aboutUs", protectUser, upload.single("image", 1), createAboutUs);
router.get("/get-aboutUs", getAboutUs);
router.delete("/delete-aboutUs", protectUser, deleteAboutUs);

module.exports = router;
