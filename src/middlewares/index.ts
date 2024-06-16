import {validationResult, check} from "express-validator"
import {Request, Response, NextFunction} from "express"

export const handleInputErrors = (req : Request, res : Response, next : NextFunction) => {

    //La validación tambien podría hacerse aqui y en routes solo llamamos al middleware
    // await check("name")
    // .notEmpty().withMessage("El nombre del Producto no puede ir vacío")
    // .run(req)
    // await check("price")
    // .isNumeric().withMessage("Valor no válido")
    // .notEmpty().withMessage("El precio del Producto no puede ir vacío")
    // .custom( (value) => value > 0 ).withMessage("Precio no válido")
    // .run(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    //Para que pase a la siguiente funcion en el routeo
    next()
}