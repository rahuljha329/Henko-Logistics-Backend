const serviceCategoryModel = require('../models/serviceCategory');
const { checkAccess } = require('../middleware/helperMiddleware');

const createServiceCategory = async (req, res) => {
  try {
    if (!checkAccess(req, res, ["Admin"])) return;

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "name required"
      });
    }

    const serviceCategory = await serviceCategoryModel.create({
    name
    });

    return res.status(201).json({
      message: "serviceCategory created successfully",
      data: serviceCategory
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

const getServiceCategory = async (req, res) => {
  try {
    const serviceCategory = await serviceCategoryModel.find();

    return res.status(200).json({
      message: "All serviceCategory are fetched successfully",
      data: serviceCategory
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

const updateServiceCategory = async (req, res) => {
  try {
    if (!checkAccess(req, res, ["Admin"])) return;

    const { id } = req.query;
    const { name } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "ServiceCategory id is required"
      });
    }

    const ServiceCategory = await serviceCategoryModel.findById(id);

    if (!ServiceCategory) {
      return res.status(404).json({
        message: "ServiceCategory not found"
      });
    }

    if (name) ServiceCategory.name = name;
    await ServiceCategory.save();

    return res.status(200).json({
      message: "ServiceCategory updated successfully",
      data: ServiceCategory
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

const deleteServiceCategory = async (req, res) => {
  try {
    if (!checkAccess(req, res, ["Admin"])) return;

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        message: " id is required"
      });
    }

    const ServiceCategory = await serviceCategoryModel.findByIdAndDelete(id);

    if (!ServiceCategory) {
      return res.status(404).json({
        message: "ServiceCategory not found"
      });
    }

    return res.status(200).json({
      message: "ServiceCategory deleted successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

module.exports = {createServiceCategory ,getServiceCategory ,updateServiceCategory ,deleteServiceCategory}
