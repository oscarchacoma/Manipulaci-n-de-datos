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
        .catch(error=> console.log(error))
    }
}