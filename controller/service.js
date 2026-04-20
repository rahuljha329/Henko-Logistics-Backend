const serviceModel = require("../models/service");
const serviceCategoryModel = require("../models/serviceCategory");
const { checkAccess } = require('../middleware/helperMiddleware')

const createService = async (req, res) => {
    try {
        if (!checkAccess(req, res, ["Admin"])) return;

        const { serviceCategoryId } = req.query;

        const { title, description, content, section } = req.body;

        if (!serviceCategoryId) {
            return res.status(400).json({
                message: "serviceCategoryId is required in query"
            });
        }

        if (!section) {
            return res.status(400).json({
                message: "section is required"
            });
        }

        const categoryExist = await serviceCategoryModel.findById(serviceCategoryId);

        if (!categoryExist) {
            return res.status(404).json({
                message: "Service Category not found"
            });
        }

        const imagePath = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
            : "";

        let parsedContent = [];
        let parsedDescription = [];

        try {
            if (req.body.content) {
                parsedContent = JSON.parse(req.body.content);
            }

            if (req.body.description) {
                parsedDescription = JSON.parse(req.body.description);
            }
        } catch (err) {
            return res.status(400).json({
                message: "Invalid JSON format in content or description"
            });
        }

        const service = await serviceModel.create({
            title,
            description: parsedDescription,
            content: parsedContent,
            section,
            image: imagePath,
            serviceCategory: serviceCategoryId
        });

        return res.status(201).json({
            message: "Service created successfully",
            data: service
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};

const getServicesByCategory = async (req, res) => {
    try {
        const { serviceCategoryId } = req.query;

        if (!serviceCategoryId) {
            return res.status(400).json({
                message: "serviceCategoryId is required in query"
            });
        }

        const services = await serviceModel
            .find({ serviceCategory: serviceCategoryId })
            .populate("serviceCategory")
        //   .sort({ createdAt: -1 });

        if (!services.length) {
            return res.status(404).json({
                message: "No services found for this category"
            });
        }

        return res.status(200).json({
            message: "Services fetched successfully",
            count: services.length,
            data: services
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};

const deleteService = async (req, res) => {
    try {
        if (!checkAccess(req, res, ["Admin"])) return;

        const { serviceId } = req.query;

        if (!serviceId) {
            return res.status(400).json({
                message: "serviceId is required in query"
            });
        }

        const service = await serviceModel.findByIdAndDelete(serviceId);

        if (!service) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        return res.status(200).json({
            message: "Service deleted successfully",
            data: service
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};


module.exports = { createService, getServicesByCategory, deleteService };