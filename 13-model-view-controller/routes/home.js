const express = require("express");

const { handleHomePage } = require("../controllers/home");

const homeRouter = express.Router();

//? /users ==> Render HTML Document for the message in homepage
homeRouter.get("/", handleHomePage);

module.exports = homeRouter;
