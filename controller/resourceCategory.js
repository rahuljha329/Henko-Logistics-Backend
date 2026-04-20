const resourceCategoryModel = require('../models/resourceCategory');
const { checkAccess } = require('../middleware/helperMiddleware');
const mongoose = require("mongoose");

const createResourceCategory = async (req, res) => {
  try {
    if (!checkAccess(req, res, ["Admin"])) return;

    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "title is required"
      });
    }

    const resourceCategory = await resourceCategoryModel.create({
      title,
      description
    });

    return res.status(201).json({
      message: "ResourceCategory created successfully",
      data: resourceCategory
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

const getResourceCategory = async (req, res) => {
  try {

    const resourceCategories = await resourceCategoryModel
      .find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "All ResourceCategories fetched successfully",
      count: resourceCategories.length,
      data: resourceCategories
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

const updateResourceCategory = async (req, res) => {
  try {
    if (!checkAccess(req, res, ["Admin"])) return;

    const { id } = req.query;
    const { title, description } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "id is required"
      });
    }

    const resourceCategory = await resourceCategoryModel.findById(id);

    if (!resourceCategory) {
      return res.status(404).json({
        message: "ResourceCategory not found"
      });
    }

    if (title) resourceCategory.title = title;
    if (description) resourceCategory.description = description;

    await resourceCategory.save();

    return res.status(200).json({
      message: "ResourceCategory updated successfully",
      data: resourceCategory
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

const deleteResourceCategory = async (req, res) => {
  try {
    if (!checkAccess(req, res, ["Admin"])) return;

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        message: "id is required"
      });
    }

    const resourceCategory = await resourceCategoryModel.findByIdAndDelete(id);

    if (!resourceCategory) {
      return res.status(404).json({
        message: "ResourceCategory not found"
      });
    }

    return res.status(200).json({
      message: "ResourceCategory deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

module.exports = {
  createResourceCategory,
  getResourceCategory,
  updateResourceCategory,
  deleteResourceCategory
};