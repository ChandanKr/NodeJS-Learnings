const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {

  const log = `New Request Received - ${req.url}\n`;

  if (req.url === "/favicon.ico") return res.end(); // to ignore favicon default request log

  const myUrl = url.parse(req.url, true); // true for getting an object of query parameters on console
  console.log(myUrl);

  fs.appendFile("./05-Handling-URLs/log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("This is Home Page");
        break;
      case "/about":
        const username = myUrl.query.myname; // for "http://localhost:8000//about?myname=Arun&age=27&dev=true"
        res.end(`Hi, ${username}. How are you?`);
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

myServer.listen(8000, () =>
  console.log("Server Started at http://localhost:8000/")
);
