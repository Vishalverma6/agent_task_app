const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;


const userRoutes = require('./routes/User');
const taskRoutes = require("./routes/Task");
const agentRoutes = require("./routes/Agent");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");



// database connection
database.connect();

// middlewares
app.use(express.json());
app.use(cookieParser());


app.use(
    cors({
        origin:"http://localhost:5173",
        // http://localhost:5173
        credentials:true,
    })
)

app.use(
    fileUpload()
)

// routes 
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/task",taskRoutes);
app.use("/api/v1/agent",agentRoutes);

// default route
app.use("/",(req, res)=> {
    return res.json({
        success:true,
        message:"Your server is up and running...",
    });
});

app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`)
})