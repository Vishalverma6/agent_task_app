const express = require("express");
const { addAgent, getAllAgent } = require("../controllers/Agent");
const { auth } = require("../middlewares/auth");
const router = express.Router();

// routes for adding a new agent 
router.post("/addAgent",auth,addAgent);

// get All agents 
router.get("/getAllAgent",auth,getAllAgent);

module.exports = router;