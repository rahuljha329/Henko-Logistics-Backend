const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  content: {
    question: {
      type: String,
      trim: true
    },
    answer: {
      type: String,
      trim: true
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('faq', faqSchema);