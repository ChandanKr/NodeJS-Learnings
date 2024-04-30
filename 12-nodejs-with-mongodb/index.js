const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const port = 8000;

// Express Middleware for Task 3:
app.use(express.urlencoded({ extended: false }));

// Custom Middleware
app.use((req, res, next) => {
  console.log("Hello From Middleware 1");

  const date = new Date(Date.now());

  fs.appendFile(
    "./12-nodejs-with-mongodb/log.js",
    `//! Time: "${date.toLocaleString()}", IP Address: "${req.ip}", Method: "${
      req.method
    }", Path: "${req.path}"\n`,
    (err, data) => {
      next();
    }
  );
});


// Connection to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/my-first-db")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error", err));

// Schema Creation
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true, // it will not insert if firstName is not provided
    },
    lastName: {
      type: String,
      required: false, // it will insert anyhow, lastName is provided or not
    },
    email: {
      type: String,
      required: true,
      unique: true, // same entries is not allowed in our database
    },
    gender: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
  },
  { timestamps: true }
);

// Model Creation
const User = mongoose.model("user", userSchema);

// CRUD Operations
//todo: TASK 3 : POST /api/users => Create new user
app.post("/api/users", async (req, res) => {
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

  return res.status(201).json({ msg: "User Created Successfully..." });
});

//? /users ==> Render HTML Document for the message in homepage
app.get("/", (req, res) => {
  const html = `
    <h1> Hello From "HTTP Status Codes" Section</h1>
    <h2 style="color:red"><a href="http://localhost:8000/api/users/" target="_blank">Click here</a> for the users data...</h2>

    <h2 style="color:red"><a href="http://localhost:8000/users/" target="_blank">Click here</a> to get users name in li format</h2>

    <h2 style="color:red"><a href="http://localhost:8000/api/users/1" target="_blank">Click here</a> to get the specific user data (change user id in url after redirecting, default id is 1) </h2>
    `;
  res.send(html);
});

//? /users ==> Render HTML Document to get users name in li format
app.get("/users", async (req, res) => {
  const allDBUsers = await User.find({});
  const html = `
    <ul>
      ${allDBUsers
        .map(
          (user) =>
            `<li>${user.firstName} ${user.lastName} [${user.gender}] - ${user.email}</li>`
        )
        .join("")}
    </ul>
    `;

  res.send(html);
});

//todo: TASK 1 : GET /api/users => List all users
app.get("/api/users", async (req, res) => {
  const allDBUsers = await User.find({});
  res.setHeader("X-MyUserName", "chandan2606"); // Creating Custom Header (Always add X-headerKey for good practice for custom headers)
  return res.json(allDBUsers);
});

//? Since, the routings are same for TASK 2, 4 and 5, We will merge them all together
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    //* TASK 2 : Get the user with ID
    const userId = await User.findById(req.params.id);

    if (!userId) return res.status(404).json({ error: "User Not Found." }); // setting status code for "404 Not Found" if user is not found with given userId in the request url

    return res.json(userId);
  })
  .patch(async (req, res) => {
    //* TASK 4 : Create new user with ID
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
    return res.status(200).json({ status: "Successfully Updated...." });
  })
  .delete(async (req, res) => {
    //* TASK 5 : Delete the user with ID
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ status: "Successfully Deleted...." });
  });

app.listen(port, () => console.log("Server Started at http://localhost:8000/"));
