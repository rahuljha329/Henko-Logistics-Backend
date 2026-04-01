const mongoose = require('mongoose');
const { Schema } = mongoose;

const homePageSchema = new mongoose.Schema({
title:{
    type:String
},
description:[{
    type:String
}],
image:{
    type:String
},
page:{
    type:String
},
section:{
    type:Number
}
}, { timestamps: true });

module.exports = mongoose.model('homePage', homePageSchema);