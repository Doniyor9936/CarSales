const express = require("express")
const cors = require("cors")
const PORT = process.env.PORT || 3001
const app = express()
const connectDB = require("./db/dbConnect")
const carCategoryRouter = require("./router/carCategoryRouter")
const carRouter = require("./router/carRouter")
const authRouter = require("./router/authRouter")
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require("./utils/swagger")
const logger = require("./utils/logger")

app.use(express.json())
app.use(cors())

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(carCategoryRouter)
app.use(carRouter)
app.use(authRouter)

connectDB()
logger.info("Logger info")
logger.warn("logger warn")
logger.error("logger error")
logger.debug("logger debug")

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})