const express = require("express");

const { handleListAllUsers } = require("../controllers/user");

const userRouter = express.Router();

//? /users ==> Render all the users in HTML Document in li format.
userRouter.get("/", handleListAllUsers);

module.exports = userRouter;