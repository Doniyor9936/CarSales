const BaseError = require("../error/errorHandler")
const carModel = require("../schema/carSchema")
const { sendMail } = require("../service/mailService")
const codeGenerate = require("../utils/helperFunctions")

const addCar = async (req, res, next) => {
    try {
        const { carName, manufactoryDate, engine, color, kmTraveled, fuelType, transmissionBox, paintCondition, price, isAvailable, description } = req.body
        await carModel.create({ carName, manufactoryDate, engine, color, kmTraveled, fuelType, transmissionBox, paintCondition, price, isAvailable, description })
        return res.status(200).json({ message: "mashinalar ro'yhatga muaffaqiyatli qoshildi" })

    } catch (error) {
        return next(BaseError.BadRequest(error.message))
    }
}
const getCar = async (req, res, next) => {
    try {
        const cars = await carModel.find()
        if (!cars) {
            return res.status(400).json({ message: "mashinalar topilmadi" })
        }
        return res.status(200).json({ message: "bozordagi mashinalar ro'yhati", cars })

    } catch (error) {
        return next(BaseError.BadRequest(error.message))
    }
}
const updateCar = async (req, res, next) => {
    try {
        const { _id } = req.params
        const { carName, manufactoryDate, engine, color, kmTraveled, fuelType, transmissionBox, paintCondition, price, isAvailable, description } = req.body
        const foundetCar = await carModel.findOneAndUpdate({ _id }, { carName, manufactoryDate, engine, color, kmTraveled, fuelType, transmissionBox, paintCondition, price, isAvailable, description }, { new: true })

        if (!foundetCar) {
            return res.status(400).json({ message: "siz qidirayotgan mashina topilmadi" })
        }
        return res.status(200).json({ message: "mashina malumotlari yangilandi", foundetCar })
    } catch (error) {
        return next(BaseError.BadRequest(error.message))
    }
}
const deleteCar = async (req, res, next) => {
    try {
        const { _id } = req.params
        const deleteCar = await carModel.findOneAndDelete( _id )
        if (!deleteCar) {
            return res.status(404).json({ message: "mashina topilmadi" })
        }
        return res.status(200).json({ message: "mashina bazadan muaffaqiyatli o'chirildi" })
    } catch (error) {
        return next(BaseError.BadRequest(error.message))
    }
}
const addLike = async (req, res, next) => {
    try {
        const { _id } = req.params
        const foundetCar = await carModel.findOne(_id)
        if (!foundetCar) {
            return res.status(201).json({ message: "mashina topilmadi" })
        }
        foundetCar.likes = (foundetCar.likes || 0) + 1
        await foundetCar.save()
        return res.status(201).json({ message: `mashina likelar soni ${foundetCar.likes} ga teng` })

    } catch (error) {
        console.log(error);
        
        return next(BaseError.BadRequest(error.message))
    }
}

module.exports = { addCar, getCar, updateCar, deleteCar, addLike }
