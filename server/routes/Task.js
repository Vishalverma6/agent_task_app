
const express = require("express");
const { uploadCSV, getTasksByAgent, getAllTask } = require("../controllers/Task");
const { auth } = require("../middlewares/auth");
const router = express.Router();


// routes for uploading CSV file 
router.post("/uploadCSV",auth,uploadCSV);

// routes for getting the task for each agent
router.get("/getTaskByAgent",auth,getTasksByAgent);

// get All task 
router.get("/getAllTask",auth,getAllTask);


module.exports = router;
