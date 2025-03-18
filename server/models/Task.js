const { text } = require("express");
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    text:{
        type:String,
    },
    agent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Agent",
        // default:null
    },
},
 {timestamps:true},
 
);


module.exports = mongoose.model("Task",taskSchema);