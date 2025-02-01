const joi = require("joi")

exports.authValidation = (data) => {
    try {
        let schema = joi.object({
            fullName: joi.string().min(1).max(50),
            email: joi.string(),
            phoneNumber: joi.string().pattern(/^\+998\d{9}$/)
        })
        return schema.validate(data)
    } catch (error) {
        throw new Error(error.message);

    }
}