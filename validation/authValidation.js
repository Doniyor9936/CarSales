const joi = require("joi")

exports.authValidation = (data) => {
    try {
        let schema = joi.object({
            fullName: joi.string().min(1).max(50),
            password: joi.string(),
            role: joi.string(),
            email: joi.string()
        })
        return schema.validate(data)
    } catch (error) {
        throw new Error(error.message);

    }
}