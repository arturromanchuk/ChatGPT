const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
    texts: [
        {
            message: {
                type: String,
            },
            textBy: {
                type: Number,
                // 0 -> chatGPT
                // 1 -> user
            },
        },
    ],
});

module.exports = new mongoose.model("query", querySchema);
