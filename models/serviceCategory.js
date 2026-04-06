const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceCategorySchema = new mongoose.Schema({
name:{
    type:String
}
}, { timestamps: true });

module.exports = mongoose.model('serviceCategory', serviceCategorySchema);