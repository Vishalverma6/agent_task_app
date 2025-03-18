
const express = require("express");
const { uploadCSV, getTasksByAgent, getAllTask } = require("../controllers/Task");
const router = express.Router();


// routes for uploading CSV file 
router.post("/uploadCSV",uploadCSV);

// routes for getting the task for each agent
router.get("/getTaskByAgent",getTasksByAgent);

// get All task 
router.get("/getAllTask",getAllTask);


module.exports = router;
