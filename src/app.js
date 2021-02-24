const express = require("express");
const cors = require("cors");

require("./db/mongoose");
const institutionRouter = require("./routers/institution");

const app = express();
app.use(cors());
app.use(express.json());
app.use(institutionRouter);

module.exports = app;
