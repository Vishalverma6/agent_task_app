const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    accountType: {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    },
    agents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Agent",
        }
    ],
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        }
    ]


},
    { timestamps: true },
)

module.exports = mongoose.model("User", userSchema);