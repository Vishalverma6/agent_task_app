const Agent = require("../models/Agent");


// add Agent
exports.addAgent = async(req, res)=> {
    try{
        // fetch the data from req body 
        const { name, email, phone } = req.body;

        // validation
        if (!name || !email || !phone) {
            return res.status(400).json({ 
                success:false,
                message:"All fields are required",
            });
        }

        // check for the existing Agent 
        const existingAgent = await Agent.findOne({email});
        if(existingAgent){
            return res.status(400).json({
                success:false,
                message:"Agent Already exist with this email Id ",
            });
        }

        // create new agent 
        const newAgent = await Agent.create({
            name:name,
            email:email,
            phone:phone,
        });

        // return response
        return res.status(200).json({
            success:true,
            message:"Agent added successfully",
            data:newAgent,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Agent could not added",
        });
    }
}

// get All agents
exports.getAllAgent = async(req, res)=> {
    try{
        const allAgent = await Agent.find();

        // validation
        if(!allAgent){
            return res.status(401).json({
                success:false,
                message:"No agents found, Please add firstly",
            });
        }

        // return response
        return res.status(200).json({
            success:true,
            message:"All agents fetched Successfully",
            data:allAgent,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while fecthing All Agents ",
        });
    }
}