const { Router } = require("express")
const { register, verify, login, logout, forgotPsw } = require("../controller/authController")
const authMiddleware = require("../middleware/authMiddleware")
const { authValidation } = require("../middleware/authValidationMiddleware")
// const authValidation = require("../validation/authValidation")

const authRouter = Router()

/**
 * @swagger
 * /register:
 *   post:
 *     summary: "Foydalanuvchini ro'yxatdan o'tkazish"
 *     description: "Foydalanuvchi ma'lumotlarini kiritib, ro'yxatdan o'tkazish va email tasdiqlash kodini yuborish."
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: "Foydalanuvchining to'liq ismi"
 *               email:
 *                 type: string
 *                 description: "Foydalanuvchining email manzili"
 *               password:
 *                 type: string
 *                 description: "Foydalanuvchining paroli"
 *               role:
 *                 type: string
 *                 description: "Foydalanuvchining roli (admin yoki user)"
 *             required:
 *               - fullName
 *               - email
 *               - password
 *               - role
 *     responses:
 *       201:
 *         description: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi, email tasdiqlash kodi yuborildi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "registered,please verify email"
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     fullName:
 *                       type: string
 *                       example: "John Doe"
 *                     role:
 *                       type: string
 *                       example: "user"
 *       400:
 *         description: "Foydalanuvchi allaqachon mavjud."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "user already exists"
 *       500:
 *         description: "Server xatosi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

authRouter.post("/register",authValidation, register)

/**
 * @swagger
 * /verify:
 *   post:
 *     summary: "Foydalanuvchi email tasdiqlash"
 *     description: "Foydalanuvchining yuborilgan tasdiqlash kodini tekshirish va tasdiqlash jarayonini yakunlash."
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: "Foydalanuvchining email manzili"
 *               code:
 *                 type: string
 *                 description: "Foydalanuvchiga yuborilgan tasdiqlash kodi"
 *             required:
 *               - email
 *               - code
 *     responses:
 *       200:
 *         description: "Tasdiqlash muvaffaqiyatli amalga oshirildi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "verifikatsiya amalga oshdi"
 *       400:
 *         description: "Foydalanuvchi topilmadi yoki xatolik yuz berdi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "foydalanuvchi topilmadi"
 *       500:
 *         description: "Serverda xatolik yuzaga keldi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "serverda xatolik"
 */

authRouter.post("/verify", verify)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: "Foydalanuvchi tizimga kirish"
 *     description: "Foydalanuvchi email va parolini tekshirib, tizimga kirish uchun tokenlarni yaratish."
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: "Foydalanuvchining email manzili"
 *               password:
 *                 type: string
 *                 description: "Foydalanuvchining paroli"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: "Tizimga muvaffaqiyatli kirildi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "tizimga muaffaqiyatli ulandingiz"
 *       400:
 *         description: "Foydalanuvchi topilmadi yoki parol xato."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "foydalanuvchi topilmadi"
 *       500:
 *         description: "Serverda xatolik yuzaga keldi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "tizimga ulanishdagi xatolik"
 */

authRouter.post("/login", login)


/**
 * @swagger
 * /logout:
 *   post:
 *     summary: "Foydalanuvchi tizimdan chiqarish"
 *     description: "Foydalanuvchi token tekshirib tizimdan chiqarish"
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: "Tizimdan muvafaqaiyatli chiqildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Foydalanuvchi tizimdan chiqarish"
 *       400:
 *         description: "Foydalanuvchi topilmadi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "foydalanuvchi topilmadi"
 *       500:
 *         description: "Serverda xatolik yuzaga keldi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "tizimga ulanishdagi xatolik"
 */
authRouter.post("/logout", authMiddleware.tokenCheck, logout)
authRouter.post("/forgotPsw", forgotPsw)
module.exports = authRouter