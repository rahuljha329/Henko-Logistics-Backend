const mongoose = require('mongoose');
const { Schema } = mongoose;

const careerSchema = new mongoose.Schema({
title:{
    type:String
},
description:[{
    type:String
}],
image:{
    type:String
}
}, { timestamps: true });

module.exports = mongoose.model('career', careerSchema);