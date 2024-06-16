import {Request, Response} from "express"
import {check} from "express-validator"
import Product from "../models/Product.model"

export const getProducts = async (req : Request, res : Response) => {
    const products = await Product.findAll({
        order: [ //opcional
            ["id", "DESC"]
        ],
        attributes: {exclude: ["createdAt", "updatedAt"]}
    })
    res.json({data: products})
}

export const getProductById = async (req : Request, res : Response) => {
    const {id} = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: "Producto No Encontrado"
        })
    }

    res.json({data: product})
 }

export const createProduct = async (req : Request, res : Response) => {
    
    //Validación con express-validator desde handler
    // await check("name")
    //             .notEmpty().withMessage("El nombre del Producto no puede ir vacío")
    //             .run(req)
    // await check("price")
    //             .isNumeric().withMessage("Valor no válido")
    //             .notEmpty().withMessage("El precio del Producto no puede ir vacío")
    //             .custom( (value) => value > 0 ).withMessage("Precio no válido")
    //             .run(req)
    const product = await Product.create(req.body)
    res.status(201).json({data: product})

    
/*  Opcion con new
    const product = new Product(req.body)
    El id es hasta que se almacena, entonces esperamos a que se almacene y el resultado ya tendra el id en savedProduct
    const savedProduct = await product.save()
    res.json({data: savedProduct}) */
}


export const updateProduct = async (req : Request, res : Response) => {
    //Verificar si existe
        const {id} = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({
                error: "Producto No Encontrado"
            })
        }
    //Actualizar
        //Compartamiento mas de rest api estricto
        // product.name = req.body.name
        // product.price = req.body.price
        // product.availability = req.body.availability
    //Con el update, si solo le pasas un campo, solo ese actualiza y los demas los mantiene
    await product.update(req.body)
    await product.save()
        res.json({data: product})
}


export const updateAvailability = async (req : Request, res : Response) => {
    //Verificar si existe
        const {id} = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({
                error: "Producto No Encontrado"
            })
        }
    //Actualizar
    product.availability = !product.dataValues.availability
    await product.save()    
    res.json({data: product})
}

export const deleteProduct = async (req : Request, res : Response) => {
    //Verificar si existe
        const {id} = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({
                error: "Producto No Encontrado"
            })
        }
    //Eliminar
    await product.destroy()
    res.json({data: "Producto Eliminado"})
    
}

