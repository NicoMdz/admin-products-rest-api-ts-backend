import { body, param } from "express-validator"
import { Router } from "express"
import { createProduct, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from "./handlers/product"
import { handleInputErrors } from "./middlewares"

const router = Router()
/**
*@swagger
* components:
*   schemas:
*       Product:
*           type: object
*           properties:
*               id:
*                   type: integer
*                   description: The Produc ID 
*                   example: 1
*               name: 
*                   type: string
*                   description: The Product name 
*                   example: Monitor Curvo de 27 Pulgadas
*               price: 
*                   type: number
*                   description: The Product Price
*                   example: 300
*               availability: 
*                   type: boolean
*                   description: The Product Availability
*                   example: true
*/

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Succesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: "#/components/schemas/Product"
 *
 */

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags: 
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Succesful Response
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: "#/components/schemas/Product"
 *          404:
 *              description: Not Found
 *          400:
 *              description: Bad Request - Invalid ID
 */

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: Monitor Curvo 37''
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *          200:
 *              description: Seccesful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Product"
 *          400:
 *              description: Bad Request - Invalid Input data
 */

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: Monitor Curvo 37''
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Seccesful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Product"
 *
 *          400:
 *              description: Bad Request - Invalid ID or input data
 *          404:
 *              description: Product Not Found
 */

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update Product availability
 *      tags:
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer 
 *      responses:
 *          200:
 *              description: Seccesful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Product"
 *
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 */

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Deletes a Product by ID
 *      tags:
 *          - Products
 *      description: Returns a "deleted" message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to delete
 *          required: true
 *          schema:
 *              type: integer 
 *      responses:
 *          200:
 *              description: Seccesful response
 *              content:
 *                  application/string:
 *                      schema:
 *                          type: string
 *                          value: "Producto Eliminado"
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 */



//Routing
router.get("/", getProducts)
//al :id se le conoce como parametro
router.get("/:id", 
    //Validación desde la ruta
    param("id")
    .isInt().withMessage("ID no válido"),
    handleInputErrors,
    getProductById)

router.post("/",    
    //Validación desde la ruta
    body("name")
          .notEmpty().withMessage("El nombre del Producto no puede ir vacío"),
    body("price")
        .isNumeric().withMessage("Valor no válido")
        .notEmpty().withMessage("El precio del Producto no puede ir vacío")
        .custom( value => value > 0 ).withMessage("Precio no válido"),
    handleInputErrors, 
    createProduct
)

router.put("/:id",
    param("id")
    .isInt().withMessage("ID no válido"),
    body("name")
        .notEmpty().withMessage("El nombre del Producto no puede ir vacío"),
    body("price")
        .isNumeric().withMessage("Valor no válido")
        .notEmpty().withMessage("El precio del Producto no puede ir vacío")
        .custom( value => value > 0 ).withMessage("Precio no válido"),
    body("availability").isBoolean().withMessage("Valora para disponibilidad no válido"),
    handleInputErrors,
    updateProduct
)

router.patch("/:id",
    param("id")
    .isInt().withMessage("ID no válido"),
    handleInputErrors,
    updateAvailability
)

router.delete("/:id",
    param("id")
    .isInt().withMessage("ID no válido"),
    handleInputErrors,
    deleteProduct
)

export default router