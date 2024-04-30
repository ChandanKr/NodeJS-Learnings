const express = require("express");

const {
  handleGetAllUsers,
  handleGetUserByID,
  handleCreateNewUser,
  handleUpdateUserByID,
  handleDeleteUserByID,
} = require("../controllers/api-user");

const apiUserRouter = express.Router();

// CRUD Operations

//? Since, the routings are same for TASK 1 and 3, We will group them all together
apiUserRouter.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

//? Since, the routings are same for TASK 2, 4 and 5, We will group them all together
apiUserRouter
  .route("/:id")
  .get(handleGetUserByID)
  .patch(handleUpdateUserByID)
  .delete(handleDeleteUserByID);

module.exports = apiUserRouter;
