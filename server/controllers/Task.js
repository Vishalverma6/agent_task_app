
const xlsx = require("xlsx");
const Task = require("../models/Task");
const Agent = require("../models/Agent");
const User = require("../models/User");


// Uploading CSV/XLXS files
exports.uploadCSV = async(req, res) => {
    try{

        const userId = req.user.id
        console.log("user",userId)

        if(!userId){
            return res.status(401).json({
                success:false,
                message:"User id is required",
            })
        }
        
         //Check if a file is uploaded
         if (!req.files || !req.files.file){
            return res.status(400).json({
                success:false,
                message:"No file uploaded",
            });
         }

         const file = req.files.file;

         // Allowed file types
         const allowedFileTypes = [
            "text/csv",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel"
        ];
        
        // Validate file type
        if (!allowedFileTypes.includes(file.mimetype)) {
            return res.status(400).json({
                success:false,
                 message: "Invalid file type. Only CSV, XLSX, and XLS are allowed.",
                 });
        }

        let tasks = [];
        
        // Process CSV or Excel file
        if(file.mimetype === "text/csv"){
            tasks = processCSV(file.data.toString());
        }else{
            tasks = processExcel(file.data);
        }

        // Distribute tasks among agents
        const distributedTasks = await distributeTasks(tasks,userId);

         //  Save the distributed tasks to MongoDB
         const savedTasks = await Task.insertMany(distributedTasks);

        //  update the new task to the user 
        await User.findByIdAndUpdate(
            {_id:userId},
            {$push : {
                tasks:savedTasks?._id,
                
            }},
            {new:true},
        )

        //  return response 
         res.status(200).json({
            success:true,
            message: "File processed and tasks assigned successfully",
            tasks: savedTasks
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
             message: "Error processing file", error: error.message,
            });
    }
};


// Function to process CSV files
const processCSV = (csvString) => {
    // console.log("Raw CSV Data:", csvString);
    const lines = csvString.trim().split("\n"); // Trim and split file into rows
    const headers = lines[0].split(",").map(h => h.trim()); // Extract column headers

    // console.log("Extracted Headers:", headers);

    //  Ensure required headers exist
    if (!headers.includes("FirstName") || !headers.includes("Phone") || !headers.includes("Notes")) {
        throw new Error("CSV file must have 'FirstName', 'Phone', and 'Notes' columns.");
    }

    // Extract data safely
    return lines.slice(1).map(line => {
        const values = line.split(",").map(value => value.trim()); // Trim values

        return {
            firstName: values[0] || "",
            phone: values[1] || "",
            text: values[2] || "",
        };
    });
};



// Function to process Excel (XLSX/XLS) files
const processExcel = (fileBuffer) => {
    // console.log("fileBuffer", fileBuffer);
    const workbook = xlsx.read(fileBuffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    // Check if required headers exist
    if (!jsonData.length || !["FirstName", "Phone", "Notes"].every(h => jsonData[0].includes(h))) {
        throw new Error("Excel file must have 'FirstName', 'Phone', and 'Notes' columns.");
    }

    // Extract data
    return jsonData.slice(1).map(row => ({
        firstName: String(row[0] || "").trim(),
        phone: String(row[1] || "").trim(),  // Ensures phone is treated as a string
        text: String(row[2] || "").trim(),
    }));
};



// Function to distribute tasks among agents
const distributeTasks = async (tasks,userId) => {
    
    const agents = await Agent.find({user:userId}); // Fetch all available agents

    if (agents.length === 0) {
        throw new Error("No agents available for task distribution.");
    }

    let distributedTasks = [];
    let agentIndex = 0;

    tasks.forEach((task) => {
        const assignedAgent = agents[agentIndex]; // Assign task to an agent
        distributedTasks.push({
            firstName: task.firstName,
            phone: task.phone,
            text: task.text,
            agent: assignedAgent._id, // Assigning agent's ID
            user:userId
        });

        // Move to the next agent in a round-robin fashion
        agentIndex = (agentIndex + 1) % agents.length;
    });

    return distributedTasks;
};


// get distributed task 
exports.getTasksByAgent = async(req, res) => {
    try{

        const userId = req.user.id

        if(!userId){
            return res.status(401).json({
                success:false,
                message:"User id is required",
            })
        }
        // Fetch all agents
        const agents = await Agent.find({user:userId});

        // if (agents.length === 0) {
        //     return res.status(404).json({
        //         success:false,
        //         message: "No agents found" ,
        //     });
        // }

        // Fetch tasks and group them by agent
        let result = [];

        for(const agent of agents){
            const tasks = await Task.find({agent:agent?._id});

            result.push({
                agent:{
                    _id:agent?._id,
                    name:agent?.name,
                    email:agent?.email,
                },
                tasks:tasks
            })
        }

        // return response
        return res.status(200).json({
            success:true,
            message:"task for each agent fetched successfully",
            data:result,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error while fecthing the task of agent",
        })
    }
}

// get All task 
exports.getAllTask = async(req, res)=> {
    try{

        const userId = req.user.id

        if(!userId){
            return res.status(401).json({
                success:false,
                message:"User id is required",
            })
        }
        const tasks = await Task.find({user:userId});

        
        
        // return response 
        return res.status(200).json({
            success:true,
            message:"All Task fetched successfully",
            data:tasks,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to fetched the All Task ",
        });
    }
};