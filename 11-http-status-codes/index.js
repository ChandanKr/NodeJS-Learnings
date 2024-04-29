const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const port = 8000;

// Express Middleware for Task 3:
app.use(express.urlencoded({ extended: false }));

// Custom Middleware
app.use((req, res, next) => {
  console.log("Hello From Middleware 1");

  const date = new Date(Date.now());

  fs.appendFile(
    "./11-http-status-codes/log.js",
    `//! Time: "${date.toLocaleString()}", IP Address: "${req.ip}", Method: "${
      req.method
    }", Path: "${req.path}"\n`,
    (err, data) => {
      next();
    }
  );
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
app.get("/users", (req, res) => {
  const html = `
    <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;

  res.send(html);
});

//todo: TASK 1 : GET /api/users => List all users
app.get("/api/users", (req, res) => {
  res.setHeader("X-MyUserName", "chandan2606"); // Creating Custom Header (Always add X-headerKey for good practice for custom headers)
  return res.json(users);
});

//todo: TASK 3 : POST /api/users => Create new user
app.post("/api/users", (req, res) => {
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

  users.push({ id: users.length + 1, ...body });
  fs.writeFile(
    "./11-http-status-codes/MOCK_DATA.json",
    JSON.stringify(users),
    (err, data) => {
      return res.status(201).json({ status: "Success", id: users.length }); // setting status code for "201 Created" first then retuning json data
    }
  );
});

//? Since, the routings are same for TASK 2, 4 and 5, We will merge them all together
app
  .route("/api/users/:id")
  .get((req, res) => {
    //* TASK 2 : Get the user with ID
    const id = Number(req.params.id);

    // Please comment one of the below two lines:
    const userId = users.find((user) => user.id === id);
    // const userId = users.find((user) => user[0].id === id); // it will automatically throw "500 Internal Server Error" as the issue in client side - typo mistake or any logic mistake in codebase.

    if (!userId) return res.status(404).json({ error: "User Not Found." }); // setting status code for "404 Not Found" if user is not found with given userId in the request url

    return res.json(userId);
  })
  .patch((req, res) => {
    //* TASK 4 : Create new user with ID
    return res.status(501).json({ status: "Pending" }); // setting status code for "501 Not Implemented" as this is not implemented yet
  })
  .delete((req, res) => {
    //* TASK 5 : Delete the user with ID
    return res.status(501).json({ status: "Pending" }); // setting status code for "501 Not Implemented" as this is not implemented yet
  });

app.listen(port, () => console.log("Server Started at http://localhost:8000/"));
