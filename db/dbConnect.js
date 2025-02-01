const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://doniyorqalandarov853:cl1yLk58bxHaS4t1@cluster0.0nmrk.mongodb.net/carMarket?retryWrites=true&w=majority&appName=Cluster0&authSource=admin");
        console.log(" Bazaga  muvaffaqiyatli ulandi.");
    } catch (error) {
        console.error("Bazaga ulanishdagi xatolik:", error.message);
        process.exit(1); 
    }
}

module.exports = connectDB;
