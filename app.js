const express = require("express");
const logger = require("morgan")

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.info(`app listen at port ${port}`));

