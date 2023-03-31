//funcion anonima
// resive dos parametros  
module.exports = (sequelize, dataTypes) => {
    const alias = "Genre" //nombre que le ponemos al modelo - al llamarlo lo tenemos que llamar de esa misma manera
    

    //definimos cols que contiene un objeto con sus propiedades  - declaramos las columnas
    const cols = {
        id: {   //primer columna del modelo Genre 
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        ranking: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        active:{
            type: dataTypes.BOOLEAN,
            allowNull: false,
        }
    }

    //declaramos el confing (tercer parametro de sequelize.define())
    let config = {
        tableName: "genres",
        createdAt: "created_at",
        updatedAt: "updated_at"
    }


    //definimos una variable que se llama como nuestro modelo que va a resivi el metodo define de sequelize
    const Genre = sequelize.define(alias,cols,config)

    return Genre;
}