const joi = require("joi")

exports.categoryValidation = (data) => {
    try {
        let schema = joi.object({
            brendName: joi.string().min(1).max(50),
            country: joi.string().min(2).max(50),
            manufactoryDate: joi.date().iso(),
            isActivy: joi.boolean()
        })
        return schema.validate(data)
    } catch (error) {
        throw new Error(error.message);

    }
}