const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true
        },
        description: [{
            type: String,
            trim: true
        }],
        content: [
            {
                _id: false,
                title: {
                    type: String,
                    trim: true
                },
                description: [{
                    type: String,
                    trim: true
                }]
            }
        ],
        image: {
            type: String,
            trim: true
        },
        section: {
            type: Number,
            required: true,
        },
        serviceCategory: {
            type: Schema.Types.ObjectId,
            ref: "serviceCategory",
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('service', serviceSchema);