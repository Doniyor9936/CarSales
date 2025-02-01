const jwt = require("jsonwebtoken")

const accessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_SEKRET, { expiresIn: process.env.ACCESS_TIME })
}
const refreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_SEKRET, { expiresIn: process.env.REFRESH_TIME })
}

module.exports = { accessToken, refreshToken }