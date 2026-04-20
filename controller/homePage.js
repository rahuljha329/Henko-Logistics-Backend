const homePageModel = require('../models/homePage');
const { checkAccess } = require('../middleware/helperMiddleware')
const mongoose = require('mongoose');

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

const updateHomePage = async (req, res) => {
  try {
    if (!checkAccess(req, res, ["Admin"])) return;

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "id required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const homePage = await homePageModel.findById(id);

    if (!homePage) {
      return res.status(404).json({ message: "HomePage not found" });
    }

    const { title, section } = req.body;

    if (title) homePage.title = title;

    if (section) {
      const exists = await homePageModel.findOne({
        section,
        _id: { $ne: id }
      });

      if (exists) {
        return res.status(400).json({
          message: "Section already exists"
        });
      }

      homePage.section = section;
    }

    if (req.file) {
      homePage.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    if (req.body.description) {
      try {
        homePage.description = JSON.parse(req.body.description);
      } catch (err) {
        return res.status(400).json({
          message: "description must be valid JSON array"
        });
      }
    } else {

      const addDesc = req.body["addDescription[]"] || req.body.addDescription;

      if (addDesc) {
        const addItems = Array.isArray(addDesc) ? addDesc : [addDesc];
        homePage.description.push(...addItems);
      }

      if (req.body.updateDescription && typeof req.body.updateDescription === "object") {
        Object.keys(req.body.updateDescription).forEach((key) => {
          const index = parseInt(key);

          if (!isNaN(index) && homePage.description[index] !== undefined) {
            console.log("Updating index:", index, "with value:", req.body.updateDescription[key]);
            homePage.description[index] = req.body.updateDescription[key];
          }
        });
      } else {
        Object.keys(req.body).forEach((key) => {
          if (key.includes("updateDescription")) {

            const indexMatch = key.match(/\[(\d+)\]/);
            if (!indexMatch) return;

            const index = parseInt(indexMatch[1]);

            if (homePage.description[index] !== undefined) {
              console.log("Updating index:", index, "with value:", req.body[key]);
              homePage.description[index] = req.body[key];
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
          if (homePage.description[i] !== undefined) {
            homePage.description.splice(i, 1);
          }
        });
      }
    }

    await homePage.save();

    return res.status(200).json({
      message: "HomePage updated successfully",
      data: homePage
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message
    });
  }
};


module.exports ={ createHomePage , getHomePage ,deleteHomePage ,updateHomePage}