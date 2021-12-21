require('dotenv').config();

const express = require("express");
const logger = require("morgan")
const mongoose = require('mongoose')
const createError = require('http-errors')

const app = express();


require("./config/db.config");
require("./config/hbs.config")

app.set("views", `${__dirname}/views`);
app.set("view engine", "hbs");


app.use(express.urlencoded({ extended: false}));
app.use(logger("dev"));
app.use(express.static(`${__dirname}/public`));

const routes =require("./config/routes.config");
app.use("/", routes);

app.use((error, req, res, next) => {
    if(error instanceof mongoose.Error.CastError && error.message.includes('ObjectId'))
    next(createError(404, 'Resource not found'));
    else {
        next(error);
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.info(`app listen at port ${port}`));

