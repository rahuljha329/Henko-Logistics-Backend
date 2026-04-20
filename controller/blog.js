const blogModel = require('../models/blog');
const { checkAccess } = require('../middleware/helperMiddleware');
const mongoose = require('mongoose');

const createBlog = async (req, res) => {
    try {
        if (!checkAccess(req, res, ["Admin"])) return;

        const { title, description, section } = req.body;

        let parsedDescription = [];

        if (req.body.description) {
            parsedDescription = JSON.parse(req.body.description);
        }

        const imagePath = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
            : "";

        const blog = await blogModel.create({
            title,
            description: parsedDescription,
            section,
            image: imagePath
        });

        return res.status(201).json({
            message: "Blog created successfully",
            data: blog
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const getBlogs = async (req, res) => {
    try {

        const blogs = await blogModel
            .find()
            .sort({ createdAt: -1 });

        return res.status(200).json({
            count: blogs.length,
            data: blogs
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


const updateBlog = async (req, res) => {
    try {
        if (!checkAccess(req, res, ["Admin"])) return;

        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: "id required" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const blog = await blogModel.findById(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        const { title, section } = req.body;

        if (title) blog.title = title;
        if (section) blog.section = section;

        if (req.file) {
            blog.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }

        if (req.body.description) {
            try {
                blog.description = JSON.parse(req.body.description);
            } catch (err) {
                return res.status(400).json({
                    message: "description must be valid JSON array"
                });
            }
        } else {

            const addDesc = req.body["addDescription[]"] || req.body.addDescription;

            if (addDesc) {
                const addItems = Array.isArray(addDesc) ? addDesc : [addDesc];
                blog.description.push(...addItems);
            }

            if (req.body.updateDescription && typeof req.body.updateDescription === "object") {
                Object.keys(req.body.updateDescription).forEach((key) => {
                    const index = parseInt(key);

                    if (!isNaN(index) && blog.description[index] !== undefined) {
                        console.log("Updating index:", index, "with value:", req.body.updateDescription[key]);
                        blog.description[index] = req.body.updateDescription[key];
                    }
                });
            } else {
                Object.keys(req.body).forEach((key) => {
                    if (key.includes("updateDescription")) {
                        const indexMatch = key.match(/\[(\d+)\]/);
                        if (!indexMatch) return;

                        const index = parseInt(indexMatch[1]);

                        if (blog.description[index] !== undefined) {
                            console.log("Updating index:", index, "with value:", req.body[key]);
                            blog.description[index] = req.body[key];
                        }
                    }
                });
            }

            const removeDesc = req.body["removeDescription[]"] || req.body.removeDescription;

            if (removeDesc) {
                let removeIndexes = Array.isArray(removeDesc)
                    ? removeDesc
                    : [removeDesc];

                removeIndexes = removeIndexes
                    .map(Number)
                    .filter((i) => !isNaN(i))
                    .sort((a, b) => b - a); 
                removeIndexes.forEach((i) => {
                    if (blog.description[i] !== undefined) {
                        blog.description.splice(i, 1);
                    }
                });
            }
        }

        await blog.save();

        return res.status(200).json({
            message: "Blog updated successfully",
            data: blog
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message
        });
    }
};
const deleteBlog = async (req, res) => {
    try {
        if (!checkAccess(req, res, ["Admin"])) return;

        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: "id required" });
        }

        const blog = await blogModel.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        return res.status(200).json({
            message: "Blog deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { createBlog, getBlogs, updateBlog, deleteBlog }