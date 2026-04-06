const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    content: [
      {
        _id: false,
        name: {
          type: String,
          trim: true
        },
        description: {
          type: String,
          trim: true
        }
      }
    ],
    image: {
      type: String,
      trim: true
    },
    section: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('aboutUs', aboutUsSchema);