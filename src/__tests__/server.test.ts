import {connectDB} from "../server"
import db from "../config/db"

 //Mock, tecnica para pruebas para simular el comportamiento de ciertos modulos, funciones u objetos en este entorno
 jest.mock("../config/db")
 describe("connectDB", () => {
    it("should handle database connection error", async () =>{
        //crea una funcion en el ambiente de este mock, le pasamos la db y le pasamos metodo que queremos observar. Provamos un error a forzado
        jest.spyOn(db, "authenticate").mockRejectedValueOnce(new Error("Hubo un error al conectar a la DB"))
        const consoleSpy = jest.spyOn(console, "log")

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("Hubo un error al conectar a la DB")
        )
    })
 })