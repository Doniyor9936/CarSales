const { authValidation } = require("../validation/authValidation")
exports.authValidation = (req, res, next) => {
    try {
        const { error } = authValidation(req.body)
        if (error) {
            return res.status(404).json({ message: "malumotlar aniq toldirilmagan" })
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: error.message })
    }
}
