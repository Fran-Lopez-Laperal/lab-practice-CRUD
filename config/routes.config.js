const express = require("express");
const router = express.Router();
const misc = require("../controllers/misc.controller");
const movies = require("../controllers/movies.controller");
const events = require("../controllers/events.controller")

router.get("/", misc.home);
router.get("/movies/list", movies.list);
router.get("/movies/create", movies.create);
router.post("/movies/create", movies.doCreate);
router.get("/movies/:id", movies.detail);
router.get("/movies/:id/edit", movies.edit);
router.post("/movies/:id", movies.doEdit);
router.post("/movies/:id/delete", movies.delete);

router.post("/movies/:movieId/events", events.doCreate)




module.exports = router;