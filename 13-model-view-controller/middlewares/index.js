const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    console.log("Hello From Middleware 1");

    const date = new Date(Date.now());

    fs.appendFile(
      filename,
      `//! Time: "${date.toLocaleString()}", IP Address: "${
        req.ip
      }", Method: "${req.method}", Path: "${req.path}"\n`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = { logReqRes };
