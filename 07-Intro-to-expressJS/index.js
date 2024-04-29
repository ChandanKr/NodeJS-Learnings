const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello from express HOME page");
});

app.get("/about", (req, res) => {
  if (req.query.name != undefined) {
    return res.send(`Hello ${req.query.name}, You in Express ABOUT Page...`);
  }
});

app.listen(8000, () => console.log("Server Started at http://localhost:8000/"));
