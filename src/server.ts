import colors from "colors"
import cors, {CorsOptions} from "cors"
import morgan from "morgan"
import swaggerUI from "swagger-ui-express"
import swaggerSpec from "./config/swagger"
import express from "express"
import router from "./routes"
import db from "./config/db"

//Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.blue("Conexión exitosa a la DB"))
    } catch (error) {
        console.log(colors.red.bold("Hubo un error al conectar a la DB"))
    }
}
connectDB()

//Instancia de express
const server = express()

//Habilitar CORS
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if (origin === process.env.FRONTEND_URL || "https://localhost:4000") {
            callback(null, true)
        } else {
            callback(new Error("Error de CORS"))
        }
    }
}
server.use(cors(corsOptions))

//Leer datos de formulario
server.use(express.json())

server.use(morgan("dev"))
server.use("/api/products", router)

//Docs
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))


export default server