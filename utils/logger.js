const { createLogger, format, transports } = require('winston');
// const winston = require('winston/lib/winston/config');
const { combine, timestamp, label, printf, prettyPrint, colorize } = format;
require("winston-mongodb")

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
const logger = createLogger({
    format: combine(
        timestamp(),
        prettyPrint(),
        colorize(),
        myFormat
    ),
    transports: [
        new transports.Console({level:"debug"}),
        new transports.File({ filename: "log/all-logs.log" }),
        new transports.MongoDB({db:"mongodb+srv://doniyorqalandarov853:cl1yLk58bxHaS4t1@cluster0.0nmrk.mongodb.net/carMarket?retryWrites=true&w=majority&appName=Cluster0&authSource=admin"})
    ]
})
module.exports = logger