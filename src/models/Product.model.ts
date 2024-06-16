import {Table, Column, Model, DataType, Default} from "sequelize-typescript"

@Table({
    tableName: "Products"
})

class Product extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    @Column({
        type: DataType.FLOAT
    })
    declare price: number
    
    @Default(true) //Default siempre antes de la columna
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean
}

export default Product