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

const getAllFAQ = async (req, res) => {
  try {
    const faqs = await faqModel.find();

    return res.status(200).json({
      message: "All FAQ are fetched successfully",
      data: faqs
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

const updateFAQ = async (req, res) => {
  try {
    if (!checkAccess(req, res, ["Admin"])) return;

    const { id } = req.query;
    const { question, answer } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "FAQ id is required"
      });
    }

    const faq = await faqModel.findById(id);

    if (!faq) {
      return res.status(404).json({
        message: "FAQ not found"
      });
    }

    if (question) faq.content.question = question;
    if (answer) faq.content.answer = answer;

    await faq.save();

    return res.status(200).json({
      message: "FAQ updated successfully",
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

const deleteFAQ = async (req, res) => {
  try {
    if (!checkAccess(req, res, ["Admin"])) return;

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        message: "FAQ id is required"
      });
    }

    const faq = await faqModel.findByIdAndDelete(id);

    if (!faq) {
      return res.status(404).json({
        message: "FAQ not found"
      });
    }

    return res.status(200).json({
      message: "FAQ deleted successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};


module.exports = { createFAQ , getAllFAQ , updateFAQ , deleteFAQ };