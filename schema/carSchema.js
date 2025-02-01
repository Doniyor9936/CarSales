const { required } = require("joi")
const mongoose = require("mongoose")

const carSchema = new mongoose.Schema({
    carName: {
        type: String,
        required: true,
    },
    manufactoryDate: {
        type: Date,
        required: true
    },
    engine: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    kmTraveled: {
        type: Number,
        required: true
    },
    fuelType: {
        type: String,
        required: true,
        enum: ["petrol", "benzin", "gaz", "electry", "hybrit"]
    },
    transmissionBox: {
        type: String,
        required: true
    },
    paintCondition: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        default: true
    },
    likes: {
        type: Number,
        default: 0
    }
})
const carModel = mongoose.model("Car", carSchema)
module.exports = carModel