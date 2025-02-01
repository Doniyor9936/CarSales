
const mongoose = require("mongoose")


const CarCategorySchema = new mongoose.Schema({
    brendName: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    manufactoryDate: {
        type: Date,
        required: true
    },
    isActivy: {
        type: Boolean,
        required: true,
        default: true
    }
})
const categoryModel = mongoose.model("Category", CarCategorySchema)
module.exports = categoryModel