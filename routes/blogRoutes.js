const express = require("express");
const router = express.Router();
const { protectUser } = require('../middleware/authUser');
const { createBlog, getBlogs, updateBlog, deleteBlog} = require("../controller/blog");
const upload = require("../middleware/uploads");

router.post("/create-blog", protectUser, upload.single("image", 1), createBlog);
router.get("/get-blogs", getBlogs);
router.delete("/delete-blog", protectUser, deleteBlog);
router.put("/update-blog", protectUser,upload.single("image", 1), updateBlog);

module.exports = router;
