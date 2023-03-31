
module.exports = (sequelize, dataTypes) => {

    const alias = "Movie"; //nombre del modelo
    
    const cols = {
        id: {  
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: dataTypes.STRING(500),
            allowNull: false,
        },
        rating: {
            type: dataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull: false,
            autoIncrement: false,
        },
        awards: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        release_date:{
            type: dataTypes.DATE,
            allowNull: false,
        },
        
        length: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        },
        genre_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,

        }
        
    }

    let config = {
        tableName: "movies", //nombre de la tabla en la base de datos
        createdAt: "created_at",
        updatedAt: "updated_at"
    }


    const Movie = sequelize.define(alias,cols,config)

    return Movie;
}
