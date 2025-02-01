const { Router } = require("express")
const { addCar, getCar, updateCar, deleteCar, addLike } = require("../controller/carController")

const carRouter = Router()
const authMiddleware = require("../middleware/authMiddleware")
const { carMiddleware } = require("../middleware/carValidationMiddleware")

/**
 * @swagger
 * /add-car:
 *   post:
 *     summary: "Yangi mashina qo'shish"
 *     description: "Yangi mashina ma'lumotlarini bazaga qo'shish."
 *     tags: [Car]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carName:
 *                 type: string
 *                 description: "Mashinaning nomi"
 *               manufactoryDate:
 *                 type: string
 *                 format: date
 *                 description: "Mashina ishlab chiqarilgan sana"
 *               engine:
 *                 type: string
 *                 description: "Mashinaning dvigatel turi"
 *               color:
 *                 type: string
 *                 description: "Mashinaning rangi"
 *               kmTraveled:
 *                 type: number
 *                 description: "Mashinaning qancha kilometr yurilgan"
 *               fuelType:
 *                 type: string
 *                 description: "Yoqilg'i turi"
 *               transmissionBox:
 *                 type: string
 *                 description: "Kuzovning uzatish tizimi"
 *               paintCondition:
 *                 type: string
 *                 description: "Mashinaning bo'yoq holati"
 *               price:
 *                 type: number
 *                 description: "Mashina narxi"
 *               isAvailable:
 *                 type: boolean
 *                 description: "Mashina mavjudmi"
 *               description:
 *                 type: string
 *                 description: "Mashina haqida qo'shimcha tavsif"
 *             required:
 *               - carName
 *               - manufactoryDate
 *               - engine
 *               - color
 *               - kmTraveled
 *               - fuelType
 *               - transmissionBox
 *               - paintCondition
 *               - price
 *               - isAvailable
 *               - description
 *     responses:
 *       200:
 *         description: "Mashina muvaffaqiyatli qo'shildi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "mashinalar ro'yhatga muaffaqiyatli qoshildi"
 *       500:
 *         description: "Serverda xatolik yuzaga keldi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "serverda xatolik yuzaga keldi"
 */

carRouter.post("/addCar", authMiddleware.tokenCheck, authMiddleware.roleCheck, carMiddleware, addCar)

/**
 * @swagger
 * /get-car:
 *   get:
 *     summary: "Bozordagi mashinalar ro'yhatini olish"
 *     description: "Barcha mavjud mashinalarni bazadan olish va foydalanuvchiga ko'rsatish."
 *     tags: [Car]
 *     responses:
 *       200:
 *         description: "Bozordagi mashinalar ro'yhati muvaffaqiyatli olinadi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "bozordagi mashinalar ro'yhati"
 *                 cars:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       carName:
 *                         type: string
 *                         description: "Mashinaning nomi"
 *                       manufactoryDate:
 *                         type: string
 *                         format: date
 *                         description: "Mashina ishlab chiqarilgan sana"
 *                       engine:
 *                         type: string
 *                         description: "Mashinaning dvigatel turi"
 *                       color:
 *                         type: string
 *                         description: "Mashinaning rangi"
 *                       kmTraveled:
 *                         type: number
 *                         description: "Mashinaning qancha kilometr yurilgan"
 *                       fuelType:
 *                         type: string
 *                         description: "Yoqilg'i turi"
 *                       transmissionBox:
 *                         type: string
 *                         description: "Kuzovning uzatish tizimi"
 *                       paintCondition:
 *                         type: string
 *                         description: "Mashinaning bo'yoq holati"
 *                       price:
 *                         type: number
 *                         description: "Mashina narxi"
 *                       isAvailable:
 *                         type: boolean
 *                         description: "Mashina mavjudmi"
 *                       description:
 *                         type: string
 *                         description: "Mashina haqida qo'shimcha tavsif"
 *       400:
 *         description: "Mashinalar topilmadi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "mashinalar topilmadi"
 *       500:
 *         description: "Serverda xatolik yuzaga keldi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "serverda xatolik yuzaga keldi"
 */

carRouter.get("/getCar", authMiddleware.tokenCheck, getCar)
/**
 * @swagger
 * /update-car/{_id}:
 *   put:
 *     summary: "Mashina ma'lumotlarini yangilash"
 *     description: "Berilgan mashinaning ma'lumotlarini yangilash. Mashina ID'si orqali qidiriladi."
 *     tags: [Car]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: "Yangilanishi kerak bo'lgan mashinaning ID'si."
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carName:
 *                 type: string
 *                 description: "Mashinaning nomi"
 *               manufactoryDate:
 *                 type: string
 *                 format: date
 *                 description: "Mashina ishlab chiqarilgan sana"
 *               engine:
 *                 type: string
 *                 description: "Mashinaning dvigatel turi"
 *               color:
 *                 type: string
 *                 description: "Mashinaning rangi"
 *               kmTraveled:
 *                 type: number
 *                 description: "Mashinaning qancha kilometr yurilgan"
 *               fuelType:
 *                 type: string
 *                 description: "Yoqilg'i turi"
 *               transmissionBox:
 *                 type: string
 *                 description: "Kuzovning uzatish tizimi"
 *               paintCondition:
 *                 type: string
 *                 description: "Mashinaning bo'yoq holati"
 *               price:
 *                 type: number
 *                 description: "Mashina narxi"
 *               isAvailable:
 *                 type: boolean
 *                 description: "Mashina mavjudmi"
 *               description:
 *                 type: string
 *                 description: "Mashina haqida qo'shimcha tavsif"
 *     responses:
 *       200:
 *         description: "Mashina muvaffaqiyatli yangilandi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "mashina malumotlari yangilandi"
 *                 foundetCar:
 *                   type: object
 *                   properties:
 *                     carName:
 *                       type: string
 *                       example: "Toyota Camry"
 *                     manufactoryDate:
 *                       type: string
 *                       example: "2020-01-01"
 *                     engine:
 *                       type: string
 *                       example: "2.5L"
 *                     color:
 *                       type: string
 *                       example: "Black"
 *                     kmTraveled:
 *                       type: number
 *                       example: 35000
 *                     fuelType:
 *                       type: string
 *                       example: "Gasoline"
 *                     transmissionBox:
 *                       type: string
 *                       example: "Automatic"
 *                     paintCondition:
 *                       type: string
 *                       example: "Good"
 *                     price:
 *                       type: number
 *                       example: 22000
 *                     isAvailable:
 *                       type: boolean
 *                       example: true
 *                     description:
 *                       type: string
 *                       example: "Well maintained car"
 *       400:
 *         description: "Mashina topilmadi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "siz qidirayotgan mashina topilmadi"
 *       500:
 *         description: "Serverda xatolik yuzaga keldi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "serverda xatolik yuzaga keldi"
 */

carRouter.put("/putCar/:_id", authMiddleware.tokenCheck, authMiddleware.roleCheck, carMiddleware, updateCar)

/**
 * @swagger
 * /delete-car/{_id}:
 *   delete:
 *     summary: "Mashina ma'lumotlarini o'chirish"
 *     description: "Berilgan mashina ID'si orqali bazadan mashina o'chiriladi."
 *     tags: [Car]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: "O'chirilishi kerak bo'lgan mashinaning ID'si."
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Mashina muvaffaqiyatli o'chirildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "mashina bazadan muaffaqiyatli o'chirildi"
 *       404:
 *         description: "Mashina topilmadi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "mashina topilmadi"
 *       500:
 *         description: "Serverda xatolik yuzaga keldi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "serverda xatolik yuzaga keldi"
 */

carRouter.delete("/deleteCar/:_id", authMiddleware.tokenCheck, authMiddleware.roleCheck, carMiddleware, deleteCar)

carRouter.patch("/addLike/:id", addLike)
module.exports = carRouter