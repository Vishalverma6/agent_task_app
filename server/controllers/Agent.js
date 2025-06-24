const Agent = require("../models/Agent");
const User = require("../models/User");


// add Agent
exports.addAgent = async (req, res) => {
    try {

        const userId = req.user.id
        const userDetails = await User.findById(userId)
        if (!userDetails) {
            return res.status(401).json({
                success: false,
                message: "User not found  required",
            })
        }
        // fetch the data from req body 
        const { name, email, phone } = req.body;

        // validation
        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // check for the existing Agent 
        const existingAgent = await Agent.findOne({ email });
        if (existingAgent) {
            return res.status(400).json({
                success: false,
                message: "Agent Already exist with this email Id ",
            });
        }

        // create new agent 
        const newAgent = await Agent.create({
            name: name,
            email: email,
            phone: phone,
            user: userId
        });

        // add the new agent to the User Schema 
        await User.findByIdAndUpdate(
            { _id: userDetails?._id },
            {
                $push: {
                    agents: newAgent?._id
                }
            },
            { new: true },
        )

        // return response
        return res.status(200).json({
            success: true,
            message: "Agent added successfully",
            data: newAgent,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Agent could not added",
        });
    }
}

// get All agents
exports.getAllAgent = async (req, res) => {
    try {
        const userId = req.user.id

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User id is required",
            })
        }
        const allAgent = await Agent.find({ user: userId })
            .populate({
                path: "tasks",
                select: "firstName phone text createdAt"
            });

        // validation
        if (!allAgent) {
            return res.status(401).json({
                success: false,
                message: "No agents found, Please add firstly",
            });
        }

        // return response
        return res.status(200).json({
            success: true,
            message: "All agents fetched Successfully",
            data: allAgent,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while fecthing All Agents ",
        });
    }
}