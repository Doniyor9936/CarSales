const BaseError = require("../error/errorHandler")
const categoryModel = require("../schema/categorySchema")

const categoryAdd = async (req, res, next) => {
    try {
        const { brendName, country, manufactoryDate, isActivy } = req.body
        await categoryModel.create({ brendName, country, manufactoryDate, isActivy })
        return res.status(200).json({ message: "categorya ro'yhatga qo'shildi" })
    } catch (error) {
        return next(BaseError.BadRequest("xatolik yuzaga keldi"))
    }
}
const categoryGet = async (req, res, next) => {
    try {
        const categoryCar = await categoryModel.find()
        if (!categoryCar) {
            return res.status(404).json("categoriya topilmadi qaytadan urinib ko'ring")
        }
        return res.status(200).json(categoryCar)
    } catch (error) {
        return next(BaseError.BadRequest("xatolik yuzaga keldi"))
    }
}
const categoryGetOne = async (req, res, next) => {
    try {
        const { brendName } = req.params

        const categoryCar = await categoryModel.findOne({ brendName })
        if (!categoryCar) {
            return res.status(404).json("categoriya topilmadi qaytadan urinib ko'ring")
        }
        return res.status(200).json({ message: "tanlangan categoriya", categoryCar })
    } catch (error) {
        return next(BaseError.BadRequest("xatolik yuzaga keldi"))

    }
}
const categoryUpdate = async (req, res, next) => {
    try {
        const { brendName } = req.params
        const { country, manufactoryDate, isActivy } = req.body
        const categoryCar = await categoryModel.findOne({ brendName })
        if (!categoryCar) {
            return res.status(404).json("categoriya topilmadi qaytadan urinib ko'ring")
        }
        const updateCategory = await categoryModel.findOneAndUpdate({ brendName }, { brendName, country, manufactoryDate, isActivy }, { new: true })
        return res.status(200).json({ message: "category muaffaqiyatli yangilandi", updateCategory })
    } catch (error) {
        return next(BaseError.BadRequest("xatolik yuzaga keldi"))
    }
}
const categoryDelete = async (req, res, next) => {
    try {
        const { brendName } = req.params
        const categoryCar = await categoryModel.findOne({ brendName })
        if (!categoryCar) {
            return res.status(404).json("categoriya topilmadi qaytadan urinib ko'ring")
        }
        await categoryModel.findOneAndDelete({ brendName })
        return res.status(200).json({ message: "categoriya o'chirildi" })
    } catch (error) {
        return next(BaseError.BadRequest("xatolik yuzaga keldi"))
    }
}
module.exports = { categoryAdd, categoryGet, categoryUpdate, categoryGetOne,categoryDelete }