const express = require("express");
const router = express.Router();
const { protectUser } = require('../middleware/authUser');
const { createService ,getServicesByCategory ,deleteService} = require("../controller/service");
const upload = require("../middleware/uploads");

router.post("/create-service", protectUser, upload.single("image", 1), createService);
router.get("/get-service-byCategory", getServicesByCategory);
router.delete("/delete-service", protectUser, deleteService);
module.exports = router;
