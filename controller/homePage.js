const homePageModel = require('../models/homePage');
const { checkAccess } = require('../middleware/helperMiddleware')

const createHomePage = async (req, res) => {
  try {
    if (!checkAccess(req, res, ["Admin"])) return;

    const { title, description ,section} = req.body;

    const imagePath = req.file
    ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    : "";
    const exists = await homePageModel.findOne({ section });
    if (exists) {
      return res.status(400).json({
        message: "Section already exists"
      });
    }


    const homePage = await homePageModel.create({
      title,
      description,
      image:imagePath,
      section
    });

    return res.status(201).json({
      message: "HomePage created successfully",
      data: homePage
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

const getHomePage = async (req, res) => {
  try {
    const { section } = req.query;

    let filter = {};

    if (section) {
      filter.section = Number(section);
    }

    const data = await homePageModel
      .find(filter)

    return res.status(200).json({
      message: "HomePage data fetched successfully",
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

const deleteHomePage = async (req, res) => {
  try {
    if (!checkAccess(req, res, ["Admin"])) return;

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        message: "id is required"
      });
    }

    const homePage = await homePageModel.findByIdAndDelete(id);

    if (!homePage) {
      return res.status(404).json({
        message: "homePage not found"
      });
    }

    return res.status(200).json({
      message: "homePage deleted successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};


module.exports ={ createHomePage , getHomePage ,deleteHomePage}