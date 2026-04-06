const mongoose = require('mongoose');
const { Schema } = mongoose;

const resourceCategorySchema = new mongoose.Schema({
title:{
    type:String
},
description:{
    type:String
}
}, { timestamps: true });

module.exports = mongoose.model('resourceCategory', resourceCategorySchema);