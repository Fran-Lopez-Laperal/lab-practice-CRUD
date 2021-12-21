const createError = require("http-errors");
const mongoose = require("mongoose");
const Movie = require("../models/movie.model");
//conectar con la base de datos//
const Event = require("../models/event.model");

module.exports.doCreate = (req, res, next) => {
  //sacamos el identificador de la movie que viene de los params de URL.//
  const { movieId } = req.params;
  //guartamos el evento del body  de la peticion POST.//
  const event = req.body;
  //añadimos al body de la peticion la movie.//
  event.movie = movieId;


  Movie.findById(movieId)
    .then(movie => {
      if (movie) {
        req.movie = movie;
        return Event.create(event)
        .then((event) => res.redirect(`/movies/${movieId}`));
      } else {
        next(createError(404, "Contact not found"));
      }
    }).catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render("movies/detail", {
          event,
          errors: error.errors,
          movie: req.movie,
        });
      } else {
        next(error);
      }
    });
};