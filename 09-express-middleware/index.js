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
  // return res.json({ msg: "Hello From Middleware 1" }); // it ends the execution by returning a msg only.
  req.myUserName = "chandan.dev"; // this will be available for all the next functions.
  next(); // it sends the execution process to the next function.
});

app.use((req, res, next) => {
  console.log("Hello From Middleware 2", req.myUserName); // to get the changes in request object in Middleware 1
  // return res.end("Hey"); // it ends the response cycle here only.
  next(); // it sends the execution process to the next function.
});

app.use((req, res, next) => {
  console.log("Hello From Middleware 3");
  fs.appendFile(
    "./09-express-middleware/log.txt",
    `Time: "${Date.now()}", IP Address: "${req.ip}", Method: "${
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
    <h1> Hello From Express Middleware Section</h1>
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
  console.log("I am in get route", req.myUserName); // to get the changes in request object in Middleware 1
  return res.json(users);
});

//todo: TASK 3 : POST /api/users => Create new user
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ id: users.length + 1, ...body });
  fs.writeFile(
    "./09-express-middleware/MOCK_DATA.json",
    JSON.stringify(users),
    (err, data) => {
      return res.json({ status: "Success", id: users.length });
    }
  );
});

//? Since, the routings are same for TASK 2, 4 and 5, We will merge them all together
app
  .route("/api/users/:id")
  .get((req, res) => {
    //* TASK 2 : Get the user with ID
    const id = Number(req.params.id);
    const userId = users.find((user) => user.id === id);
    return res.json(userId);
  })
  .patch((req, res) => {
    //* TASK 4 : Create new user with ID
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    //* TASK 5 : Delete the user with ID
    return res.json({ status: "Pending" });
  });

app.listen(port, () => console.log("Server Started at http://localhost:8000/"));
