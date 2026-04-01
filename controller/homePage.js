const homePageModel = require('../models/homePage');
const { checkAccess } = require('../middleware/helperMiddleware')

const createHomePage = async (req, res) => {
  try {
    if (!checkAccess(req, res, ["Admin"])) return;

    const { title, description, page ,section} = req.body;

    const imagePath = req.file
  ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
  : "";

    const homePage = await homePageModel.create({
      title,
      description,
      image:imagePath,
      page,
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

module.exports ={createHomePage}