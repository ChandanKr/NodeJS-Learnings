const express = require("express");
const { connectToMongoDB } = require("./connection");

const urlRoute = require("./routes/url");

const app = express();
const PORT = 8010;

// Connection to MongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("Mongo Error", err));

// Middleware
app.use(express.json());

// Routes
app.use("/url", urlRoute);

app.listen(PORT, () =>
  console.log(`Server Started at http://localhost:${PORT}/`)
);
