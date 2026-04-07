const express = require("express");
const router = express.Router();
const { protectUser } = require('../middleware/authUser');
const { createResourceCategory,
  getResourceCategory,
  updateResourceCategory,
  deleteResourceCategory} = require("../controller/resourceCategory");

router.post("/create-resourceCategory", protectUser, createResourceCategory);
router.get("/get-resourceCategory", getResourceCategory);
router.put("/update-resourceCategory", protectUser, updateResourceCategory);
router.delete("/delete-resourceCategory", protectUser, deleteResourceCategory);

module.exports = router;