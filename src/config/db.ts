import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv"
dotenv.config() 

const db = new Sequelize(process.env.DATABESE_URI!, {
    models: [__dirname + '/../models/**/*'],
    logging: false //Para evitar los logs en consola y facilitar testing
})


export default db