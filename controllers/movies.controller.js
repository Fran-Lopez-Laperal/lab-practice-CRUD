const Movie = require("../models/movie.model.js");

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
        res.render("movies/detail", { movie });
      } else {
        res.redirect("/");
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
        res.redirect("/");
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
        res.redirect("/");
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
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      next(error);
    });
};
