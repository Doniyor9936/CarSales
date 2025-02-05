require('dotenv').config();
const { AuthModel } = require("../schema/authSchema");
const bcryptjs = require("bcryptjs")
const mailService = require("../service/mailService")
const codeGenerate = require("../utils/helperFunctions");
const BaseError = require('../error/errorHandler');
const { accessToken, refreshToken } = require("../utils/tokenGenerate");


const register = async (req, res, next) => {
    try {

        const { fullName, password, email, role } = req.body
        const foundetUser = await AuthModel.findOne({ email })
        if (foundetUser) {
          return  res.status(400).json("user alredy exists")
        }
        const code = codeGenerate()
        await mailService.sendMail(email, code)
        const hashPassword = await bcryptjs.hash(password, 8);
        const user = await AuthModel.create({
            email,
            password: hashPassword,
            fullName,
            verificationCode: code,
            role
        });

        setTimeout(async () => {
            await AuthModel.findByIdAndUpdate(user._id, { verificationCode: 0 });
        }, 5 * 180 * 1000);
        res.status(201).json({
            message: "registered,please verify email",
            user
        });
    } catch (error) {
        return res.status(500).json(error.message)
    }

}
const verify = async (req, res, next) => {
    try {
        const { email, code } = req.body
        const foundetUser = await AuthModel.findOne({ email })
        if (!foundetUser) {
            return next(BaseError.BadRequest("foydalanuvchi topilmadi"))
        }
        if (code === foundetUser.verificationCode) {
            await AuthModel.findByIdAndUpdate(foundetUser._id, { isverfy: true, verificationCode: 0 })
            return res.status(200).json({ message: "ver ifikatsiya amalga oshdi" })
        }

    } catch (error) {
        return next(BaseError.BadRequest("serverda xatolik"))
    }
}
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const foundetUser = await AuthModel.findOne({ email })
        if (!foundetUser) {
            console.log("xatolik bor");

            return next(BaseError.BadRequest("foydalanuvchi topilmadi"))
        }
        const comparePsw = await bcryptjs.compare(password, foundetUser.password)
        const payload = {
            email: foundetUser.email,
            _id: foundetUser._id,
            role: foundetUser.role
        }
        let accessTokenChek = accessToken(payload)
        let refreshTokenChek = refreshToken(payload)

        res.cookie("accesToken", accessTokenChek, { httpOnly: true, maxAge: 60 * 30 * 1000 })
        res.cookie("refreshToken", refreshTokenChek, { httpOnly: true, maxAge: 10 * 24 * 60 * 60 * 1000 })
        if (comparePsw && foundetUser.isverfy === true) {
            return res.status(200).json({ message: "tizimga muaffaqiyatli ulandingiz", accessTokenChek })
        }
        else {
            return res.status(401).json({ message: "passwordda xatolik yoki verifikatsigada xatolik" })
        }
    } catch (error) {
        return next(BaseError.BadRequest("tizimga ulanishdagi xatolik"))
    }
}
const logout = async (req, res, next) => {
    try {
        res.clearCookie("accesToken", { httpOnly: true })
        res.clearCookie("refreshToken", { httpOnly: true })

        return res.status(200).json({ message: "tizimdan muaffaqiyatli chiqdingiz" })
    } catch (error) {
        return next(BaseError.BadRequest("Tizimdan chiqishda xatolik"))
    }
}
const forgotPsw = async (req, res, next) => {
    const { email } = req.body
    const foundetUser = await AuthModel.findOne({ email })
    if (!foundetUser) {
        return res.status(404).json({ message: "bunday foydalanuvchi topilmadi" })
    }
    const newPsw = codeGenerate()
    const hashPassword = await bcryptjs.hash(`${newPsw}`, 8)
    foundetUser.password = hashPassword
    await foundetUser.save()

    mailService.sendMail(email, newPsw)
    return res.status(201).json({ message: "yangi parol emailga jonatildi" })
}

module.exports = { register, verify, login, logout, forgotPsw }