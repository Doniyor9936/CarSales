const { required } = require("joi")
const mongoose = require("mongoose")

const AuthSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"]
    },


    verificationCode: {
        type: String,
        required: true
    },
    isverfy: {
        type: Boolean,
        default: true
    }
})
const AuthModel = mongoose.model("Authentification", AuthSchema)
module.exports = { AuthModel }