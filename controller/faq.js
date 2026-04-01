const faqModel = require('../models/faq');
const { checkAccess } = require('../middleware/helperMiddleware');

const createFAQ = async (req, res) => {
  try {
    if (!checkAccess(req, res, ["Admin"])) return;

    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        message: "Question and Answer are required"
      });
    }

    const faq = await faqModel.create({
      content: {
        question,
        answer
      }
    });

    return res.status(201).json({
      message: "FAQ created successfully",
      data: faq
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

module.exports = { createFAQ };