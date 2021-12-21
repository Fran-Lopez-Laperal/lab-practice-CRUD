const createError = require("http-errors");

const Movie = require("../models/movie.model.js");
const Event = require("../models/event.model")

module.exports.list = (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/list", { movies });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.create = (req, res, next) => {
  res.render("movies/create");
};

module.exports.doCreate = (req, res, next) => {
  Movie.create(req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      res.render("movies/create", {
        movie: req.body,
        errors: error.errors,
      });
    });
};

module.exports.detail = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (movie) {
        return Event.find({ movie: req.params.id})
        .then(events => res.render("movies/detail", { movie, events }) )
        
      } else {
        next(createError(404, "Movie not found"));
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.edit = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (movie) {
        res.render("movies/edit", { movie });
      } else {
        next(createError(404, "Movie not found"));
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.doEdit = (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    .then((movie) => {
      if (movie) {
        res.redirect(`${movie.id}`);
      } else {
        next(createError(404, "Movie not found"));
      }
    })
    .catch((error) => {
      const movie = req.body;
      movie.id = req.paramas.id;

      res.render("movies/edit", {
        movie,
        error: error.errors,
      });
    });
};

module.exports.delete = (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then((movie) => {
      if (movie) {
        res.redirect("/movies");
      } else {
        next(createError(404, "Movie not found"));
      }
    })
    .catch((error) => next(error));
};
