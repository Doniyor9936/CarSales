const jsonwebtoken = require('jsonwebtoken')
class AuthMiddleware {
    async tokenCheck(req, res, next) {
        try {
            const authorizationHeader = req.headers.authorization
            if (!authorizationHeader)
                return res.status(401).json({ message: 'Foydalanuvchi aniqlanmadi' })
            const accessToken = authorizationHeader.split(' ')[1]
            if (!accessToken)
                return res.status(401).json({ message: 'Foydalanuvchi aniqlanmadi' })
            const userData = jsonwebtoken.verify(accessToken, process.env.ACCESS_SEKRET)
            if (!userData)
                return res.status(401).json({ message: 'Foydalanuvchi aniqlanmadi' })

            req.user = userData
            next()
        } catch (error) {
            return res.status(404).json({ message: error.message })
        }
    }

    async roleCheck(req, res, next) {
        try {
            if (req.user.role !== "admin")
                return res.status(403).json({ message: 'Foydalanuvchining bunday huquqi yoq' })
            next()
        } catch (error) {
            return res.status(403).json({ message: error.message })
        }
    }
   
}


module.exports = new AuthMiddleware()