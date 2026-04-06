const aboutUsModel = require('../models/aboutUs');
const { checkAccess } = require('../middleware/helperMiddleware');

const createAboutUs = async (req, res) => {
  try {
    if (!checkAccess(req, res, ["Admin"])) return;

    const { title, description, content, section } = req.body;

    if (!section) {
      return res.status(400).json({
        message: "Section is required"
      });
    }

    const exists = await aboutUsModel.findOne({ section });
    if (exists) {
      return res.status(400).json({
        message: "Section already exists"
      });
    }

    const imagePath = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : "";

    let parsedContent = [];
    if (content) {
      parsedContent = typeof content === "string" ? JSON.parse(content) : content;
    }

    const about = await aboutUsModel.create({
      title,
      description,
      content: parsedContent,
      image: imagePath,
      section
    });

    return res.status(201).json({
      message: "About Us created successfully",
      data: about
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

const getAboutUs = async (req, res) => {
  try {
    const { section } = req.query;

    let filter = {};

    if (section) {
      filter.section = Number(section);
    }

    const data = await aboutUsModel
      .find(filter)

    return res.status(200).json({
      message: "About Us data fetched successfully",
      count: data.length,
      data
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

const deleteAboutUs = async (req, res) => {
  try {
    if (!checkAccess(req, res, ["Admin"])) return;

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        message: "id is required"
      });
    }

    const aboutUs = await aboutUsModel.findByIdAndDelete(id);

    if (!aboutUs) {
      return res.status(404).json({
        message: "aboutUs not found"
      });
    }

    return res.status(200).json({
      message: "aboutUs deleted successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

module.exports = {createAboutUs ,getAboutUs ,deleteAboutUs}