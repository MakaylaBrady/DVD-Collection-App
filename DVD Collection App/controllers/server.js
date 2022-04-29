// import express lib and initialise it to app var
const express = require("express");
const app = express();
const updateRouter = require("../models/updateDB.js");
const getRouter = require("../models/getDB.js");
const syncRouter = require("../models/syncDB.js");
const pool = require("../models/dbConfig.js");

// server port
const PORT = 4000;

// allows to read static files e.g. css, imgs...
app.use(express.static('views'));
app.use("/models", express.static('models'));

// allows us to access data entered into form, inside our request vars
app.use(express.urlencoded({
    extended: false
}));

// allows us to accept json data
app.use(express.json());

// run routers
app.use("/", updateRouter);
app.use("/", getRouter);
app.use("/", syncRouter);


// login route
app.get("/", (req, res) => {
    res.render("index.html");
});


// launches server and listens on PORT var
app.listen(PORT);


