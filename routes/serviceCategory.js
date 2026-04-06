const express = require("express");
const router = express.Router();
const { protectUser } = require('../middleware/authUser');
const { createServiceCategory ,getServiceCategory ,updateServiceCategory ,deleteServiceCategory} = require("../controller/serviceCategory");

router.post("/create-serviceCategory", protectUser, createServiceCategory);
router.get("/get-serviceCategory", getServiceCategory);
router.put("/update-ServiceCategory", protectUser, updateServiceCategory);
router.delete("/delete-ServiceCategory", protectUser, deleteServiceCategory);

module.exports = router;