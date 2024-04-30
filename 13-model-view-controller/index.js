const express = require("express");
const { connectMongoDB } = require("./connection");

const { logReqRes } = require("./middlewares/index");

const homeRouter = require("./routes/home");
const userRouter = require("./routes/user");
const apiUserRouter = require("./routes/api-user");

const app = express();
const port = 8000;

// Connection to MongoDB
connectMongoDB("mongodb://127.0.0.1:27017/my-first-db")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error", err));

// Express Middleware for Task 3:
app.use(express.urlencoded({ extended: false }));

// Custom Middleware
app.use(logReqRes("./13-model-view-controller/log.js"));

// Routes
app.use("/", homeRouter);
app.use("/users", userRouter);
app.use("/api/users", apiUserRouter);

app.listen(port, () => console.log("Server Started at http://localhost:8000/"));
