const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false

    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Provide a valid email address'
        ]
    },
    displayName: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});
module.exports = model("User", userSchema);