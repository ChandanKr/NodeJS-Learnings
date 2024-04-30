const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  //* TASK 1 : GET /api/users => List all users
  const allDBUsers = await User.find({});
  res.setHeader("X-MyUserName", "chandan2606"); // Creating Custom Header (Always add X-headerKey for good practice for custom headers)
  return res.json(allDBUsers);
}

async function handleGetUserByID(req, res) {
  //* TASK 2 : Get the user with ID
  const userId = await User.findById(req.params.id);

  if (!userId) return res.status(404).json({ error: "User Not Found." }); // setting status code for "404 Not Found" if user is not found with given userId in the request url

  return res.json(userId);
}

async function handleCreateNewUser(req, res) {
  //* TASK 3 : POST /api/users => Create new user
  const body = req.body;

  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res
      .status(400)
      .json({ msg: "Bad Request - All fields are required..." }); // setting status code for "400 Bad Request" if all body fields are not sent through request body
  }

  // Creating User
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res
    .status(201)
    .json({ msg: "User Created Successfully...", id: result._id });
}

async function handleUpdateUserByID(req, res) {
  //* TASK 4 : Create new user with ID
  await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
  return res.status(200).json({ status: "Successfully Updated...." });
}

async function handleDeleteUserByID(req, res) {
  //* TASK 5 : Delete the user with ID
  await User.findByIdAndDelete(req.params.id);
  return res.status(200).json({ status: "Successfully Deleted...." });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserByID,
  handleCreateNewUser,
  handleUpdateUserByID,
  handleDeleteUserByID,
};
