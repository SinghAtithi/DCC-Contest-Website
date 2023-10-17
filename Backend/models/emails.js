const mongoose = require("mongoose");

const emailSchema = mongoose.Schema({
    email_id: {
        type: String,
        required: true
    },
    app_key: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    },
    lastReset: {
        type: Date,
        default: new Date()
    }
});

const Email = mongoose.model("Email", emailSchema);
module.exports = Email;
