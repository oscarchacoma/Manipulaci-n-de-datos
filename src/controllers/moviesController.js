const { validationResult } = require("express-validator")
const db = require ("../database/models")
const Op = db.Sequelize.Op


module.exports = {
    list: (req, res) => {
        // Retorna la vista genresList con todos los generos de la DB
        db.Movie.findAll()
        .then((movies)=>{
        return res.render("moviesList",{movies})
        })
    },
    detail:(req,res) =>{
        const movieId = req.params.id;
        db.Movie.findByPk(movieId)
        .then((movie)=>{
            return res.render("moviesDetail",{movie})
        })
    },
    new: (req, res) => {
        db.Movie.findAll({
            order: [['release_date', 'DESC']],
        })
        .then(movies => {
            return res.render('newestMovies', {movies})
        })
    },
    recomended: (req,res)=>{
        db.Movie.findAll({
            where: {
                rating: {[Op.gte]: 5},
            },
            order: [["rating", "DESC"]],
            limit: 5,
        })
        .then(movies=>{
            return res.render("recommendedMovies",{movies})
        })
    },
    add: function (req,res) {
        return res.render ("moviesAdd")
    },
    create: function (req,res) {
        const errors = validationResult(req);

        if(errors.isEmpty()){
            const { //destructuramos el req.body
                title, 
                awards, 
                release_date, 
                length, 
                rating
            } = req.body;

            db.Movie.create({ //creacion
                title, 
                awards, 
                release_date, 
                length, 
                rating
            })
            .then((movie)=>{ //devuelve la movie que creo - devuelve el id de la movie que acaba de crear 
                return res.redirect("/movies")
            })
            .catch((arror) => console.log(error)) //muestra un error en caso de tenerlo
        }else{
            
            return res.render ("moviesAdd",{errors: errors.mapped()})
        }
    },
    edit: function(req,res){
        const MOVIE_ID = req.params.id;

        db.Movie.findByPk(MOVIE_ID) //retorna una promesa
        .then(Movie=>{  //capturamos la promesa
            return res.render("moviesEdit",{Movie})
        })
        .catch(error=> console.log(error));
    },
    update: function(req,res){
        const errors = validationResult(req);
        const MOVIE_ID = req.params.id;

        if(errors.isEmpty()){
            const { //destructuramos el req.body
                title, 
                awards, 
                release_date, 
                length, 
                rating
            } = req.body;


            db.Movie.update({
                title,
                awards,
                release_date,
                length,
                rating
            }, {
                where:{ //condicion en el segundo objeto
                    id: MOVIE_ID, //la condicion debe ser que sea el mismo id que se paso por el req.params   
                },
            })
            .then((response)=>{
                if(response){
                    return res.redirect(`/movies/detail/${MOVIE_ID}`); // REDIRECCIONA A LA PELICULA QUE SE MODIFICO
                }else{
                    throw new Error() //throw es el return para los errores, podemos escribir un string con un msj de error ('mensaje de error)
                    //redirije a una vista de error en caso de que no se pudo editar
                }
            })
            .catch(error => console.log(error))

        }else{
            db.Movie.findByPk(MOVIE_ID) //retorna una promesa /// BSCA LA PELICULA QUE SE PIDE.
            .then(Movie=>{  //capturamos la promesa //UNA VES ENCONTRADA
                return res.render("moviesEdit",{
                            Movie,
                            errors: errors.mapped}) // HAGO EL RETURNT DE LA VISTA 
            })
            .catch(error=> console.log(error));
        }
    },
    delete: function(req, res){
        const MOVIE_ID = req.params.id;

        db.Movie.findByPk(MOVIE_ID)
        .then(movieToDelete => 
            res.render(
                "moviesDelete",
                {Movie: movieToDelete})
            )
            .catch(error => console.log(error));

    },
    destroy: function(req,res){
        const MOVIE_ID = req.params.id;

        db.Movie.destroy({ //destruimos el registro con la condicion where id sea igual al MOVIE_ID que viene por el params
            where: {
                id: MOVIE_ID
            }
        })
        .then(()=>{
            return res.redirect("/movies")
        })
        .catch(error => console.log(error))

    }

}