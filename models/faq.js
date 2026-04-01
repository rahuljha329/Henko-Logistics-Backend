const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  content: {
    question: {
      type: String,
      required: true,
      trim: true
    },
    answer: {
      type: String,
      required: true,
      trim: true
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('faq', faqSchema);