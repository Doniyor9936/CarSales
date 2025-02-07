const { Router } = require("express")
const { register, verify, login, logout, forgotPsw } = require("../controller/authController")
const authMiddleware = require("../middleware/authMiddleware")
const { authValidation } = require("../middleware/authValidationMiddleware")
// const authValidation = require("../validation/authValidation")

const authRouter = Router()
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: "Foydalanuvchi ro'yxatdan o'tishi"
 *     description: "Yangi foydalanuvchi yaratish va email tasdiqlash kodi yuborish"
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - password
 *               - email
 *               - role
 *             properties:
 *               fullName:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 50
 *                 example: "Ixtiyor Qalandarov"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ixtiyorqalandarov853@gmail.com"
 *               role:
 *                 type: string
 *                 enum: ["user", "admin"]
 *                 example: "user"
 *     responses:
 *       201:
 *         description: "Foydalanuvchi muvaffaqiyatli yaratildi, email tasdiqlash kodi yuborildi"
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
 *                     _id:
 *                       type: string
 *                       example: "60d0fe4f5311236168a109ca"
 *                     fullName:
 *                       type: string
 *                       example: "Ixtiyor Qalandarov"
 *                     email:
 *                       type: string
 *                       example: "ixtiyorqalandarov853@gmail.com"
 *                     role:
 *                       type: string
 *                       example: "user"
 *       400:
 *         description: "Foydalanuvchi allaqachon mavjud"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "user already exists"
 *       500:
 *         description: "Server xatosi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
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

/**
 * @swagger
 * /auth/forgotPsw:
 *   post:
 *     summary: Parolni tiklash
 *     description: Foydalanuvchining email manziliga yangi parol yuboriladi.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       201:
 *         description: Yangi parol emailga yuborildi.
 *       404:
 *         description: Foydalanuvchi topilmadi.
 */
authRouter.post("/forgotPsw", forgotPsw)
module.exports = authRouter