const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} : New Request Received - ${req.url}\n`;
  fs.appendFile("./04-Building-HTTP-Server/log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("This is Home Page");
        break;
      case "/about":
        res.end("This is About Page");
        break;
      case "/contact":
        res.end("This is Contact Page");
        break;
      default:
        res.end("Error 404 Not Found (Invalid Path.....)");
        break;
    }
  });
});

myServer.listen(8000, () => console.log("Server Started at http://localhost:8000/"));
