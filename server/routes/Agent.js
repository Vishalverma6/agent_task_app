const express = require("express");
const { addAgent, getAllAgent } = require("../controllers/Agent");
const router = express.Router();

// routes for adding a new agent 
router.post("/addAgent",addAgent);

// get All agents 
router.get("/getAllAgent",getAllAgent);

module.exports = router;