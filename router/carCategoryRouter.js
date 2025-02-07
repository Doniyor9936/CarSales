const { Router } = require("express")
const { categoryAdd, categoryGet, categoryUpdate, categoryGetOne, categoryDelete } = require("../controller/carCategory")
const { categoryMiddleware } = require("../middleware/categoryValidatorMiddleware")
const authMiddleware = require("../middleware/authMiddleware")


const carCategoryRouter = Router()
/**
 * @swagger
 * /category/add:
 *   post:
 *     summary: "Brend qo'shish"
 *     description: "Yangi brend kategoriyasini tizimga qo'shish."
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brendName:
 *                 type: string
 *                 description: Brend nomi
 *                 example: "Tesla"
 *               country:
 *                 type: string
 *                 description: Brendning ishlab chiqarilgan mamlakati
 *                 example: "USA"
 *               manufactoryDate:
 *                 type: string
 *                 format: date
 *                 description: Brendning ishlab chiqarilgan sanasi
 *                 example: "2020-05-20"
 *               isActivy:
 *                 type: boolean
 *                 description: Brend faoliyatda yoki yo'qligini bildiradi
 *                 example: true
 *     responses:
 *       200:
 *         description: "Kategoriya muvaffaqiyatli qo'shildi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "categorya ro'yhatga qo'shildi"
 *       400:
 *         description: "Xatolik yuzaga keldi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "xatolik yuzaga keldi"
 */
carCategoryRouter.post("/addCategory", authMiddleware.tokenCheck, authMiddleware.roleCheck, categoryMiddleware, categoryAdd)
/**
 * @swagger
 * /getCategory:
 *   get:
 *     summary: "Kategoriya ro'yxatini olish"
 *     description: "Barcha brend kategoriyalarini tizimdan olish."
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: "Kategoriya ro'yxati muvaffaqiyatli olindi."
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Kategoriyaning unik IDsi
 *                   brendName:
 *                     type: string
 *                     description: Brend nomi
 *                   country:
 *                     type: string
 *                     description: Brendning ishlab chiqarilgan mamlakati
 *                   manufactoryDate:
 *                     type: string
 *                     format: date
 *                     description: Brendning ishlab chiqarilgan sanasi
 *                   isActivy:
 *                     type: boolean
 *                     description: Brend faoliyatda yoki yo'qligini bildiradi
 *       404:
 *         description: "Kategoriya topilmadi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "categoriya topilmadi qaytadan urinib ko'ring"
 *       400:
 *         description: "Xatolik yuzaga keldi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "xatolik yuzaga keldi"
 */
carCategoryRouter.get("/getCategory", categoryMiddleware, categoryGet)
/**
 * @swagger
 * /editCategory/{brendName}:
 *   put:
 *     summary: "Kategoriya ma'lumotlarini yangilash"
 *     description: "Kategoriya ma'lumotlarini yangilash. Brend nomiga qarab yangilash amalga oshiriladi."
 *     tags: [Category]
 *     parameters:
 *       - name: brendName
 *         in: path
 *         required: true
 *         description: "Yangilanishi kerak bo'lgan brendning nomi"
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               country:
 *                 type: string
 *                 description: "Brendning ishlab chiqarilgan mamlakati"
 *               manufactoryDate:
 *                 type: string
 *                 format: date
 *                 description: "Brendning ishlab chiqarilgan sanasi"
 *               isActivy:
 *                 type: boolean
 *                 description: "Brend faoliyatda yoki yo'qligini bildiradi"
 *     responses:
 *       200:
 *         description: "Kategoriya muvaffaqiyatli yangilandi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "category muaffaqiyatli yangilandi"
 *                 updateCategory:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: "Kategoriya IDsi"
 *                     brendName:
 *                       type: string
 *                       description: "Brend nomi"
 *                     country:
 *                       type: string
 *                       description: "Brendning ishlab chiqarilgan mamlakati"
 *                     manufactoryDate:
 *                       type: string
 *                       format: date
 *                       description: "Brendning ishlab chiqarilgan sanasi"
 *                     isActivy:
 *                       type: boolean
 *                       description: "Brend faoliyatda yoki yo'qligini bildiradi"
 *       404:
 *         description: "Kategoriya topilmadi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "categoriya topilmadi qaytadan urinib ko'ring"
 *       400:
 *         description: "Xatolik yuzaga keldi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "xatolik yuzaga keldi"
 */

carCategoryRouter.put("/editCategory/:brendName", categoryMiddleware, categoryUpdate)
/**
 * @swagger
 * /getCategory/{brendName}:
 *   get:
 *     summary: "Kategoriya ma'lumotlarini olish"
 *     description: "Brend nomi bo'yicha kategoriya ma'lumotlarini olish."
 *     tags: [Category]
 *     parameters:
 *       - name: brendName
 *         in: path
 *         required: true
 *         description: "Brend nomi bo'yicha kategoriya ma'lumotlarini olish"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Tanlangan kategoriya muvaffaqiyatli olindi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "tanlangan categoriya"
 *                 categoryCar:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: "Kategoriya IDsi"
 *                     brendName:
 *                       type: string
 *                       description: "Brend nomi"
 *                     country:
 *                       type: string
 *                       description: "Brendning ishlab chiqarilgan mamlakati"
 *                     manufactoryDate:
 *                       type: string
 *                       format: date
 *                       description: "Brendning ishlab chiqarilgan sanasi"
 *                     isActivy:
 *                       type: boolean
 *                       description: "Brend faoliyatda yoki yo'qligini bildiradi"
 *       404:
 *         description: "Kategoriya topilmadi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "categoriya topilmadi qaytadan urinib ko'ring"
 *       400:
 *         description: "Xatolik yuzaga keldi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "xatolik yuzaga keldi"
 */

carCategoryRouter.get("/getCategory/:brendName", categoryMiddleware, categoryGetOne)
/**
 * @swagger
 * /deleteCategory/{brendName}:
 *   delete:
 *     summary: "Kategoriya o'chirish"
 *     description: "Brend nomi bo'yicha kategoriya o'chiriladi."
 *     tags: [Category]
 *     parameters:
 *       - name: brendName
 *         in: path
 *         required: true
 *         description: "O'chiriladigan kategoriya brend nomi"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Kategoriya muvaffaqiyatli o'chirildi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "categoriya o'chirildi"
 *       404:
 *         description: "Kategoriya topilmadi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "categoriya topilmadi qaytadan urinib ko'ring"
 *       400:
 *         description: "Xatolik yuzaga keldi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "xatolik yuzaga keldi"
 */

carCategoryRouter.delete("/deleteCategory/:brendName", categoryDelete)

module.exports = carCategoryRouter