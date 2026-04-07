const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new mongoose.Schema({
title:{
    type:String
},
description:[{
    type:String
}],
image:{
    type:String
},
section:{
    type:Number
}
}, { timestamps: true });

module.exports = mongoose.model('blog', blogSchema);