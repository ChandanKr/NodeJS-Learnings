const fs = require("fs");

//===================================================
//? How to **CREATE** a file with fs => "writeFile"
//===================================================

//* Synchronous (Blocking Operation)
// fs.writeFileSync(
//   "./03-file-handling/test.txt",
//   `Hey there 🙋‍♂️, this file is created from Synchronous part of "./03-file-handling/file.js"`
// );

//* Asynchronous (Non-Blocking Operation)
// fs.writeFile(
//   "./03-file-handling/test.txt",
//   `Hey there 🙋‍♂️, this file is created from Asynchronous part of "./03-file-handling/file.js"`,
//   (err) => {}
// );

//================================================
//? How to **READ** a file with fs => "readFile"
//================================================

//* Synchronous => returns the value in a variable, if error encountered, we can handle with try-catch.
// const myDetails = fs.readFileSync("./03-file-handling/details.txt", "utf-8");
// console.log(myDetails);

//* Asynchronous => Return type: VOID -> doesn't return any value, it expects a callback function that has two params error and result.
// fs.readFile("./03-file-handling/details.txt", "utf-8", (err, myDetails) => {
//   if (err) {
//     console.log("Error: ", err);
//   } else {
//     console.log(myDetails);
//   }
// });

//============================================================
//? How to **APPEND** data in a file with fs => "appendFile"
//============================================================

// fs.appendFileSync(
//   "./03-file-handling/details.txt", `\nHey, I'm appending from "appendFileSync" `
// );

//============================================
//? How to **COPY** a file with fs => "cp"
//============================================

// fs.cpSync(
//   "./03-file-handling/details.txt",
//   "./03-file-handling/copyDetails.txt"
// );

//================================================
//? How to **DELETE** a file with fs => "unlink"
//================================================

// fs.unlinkSync("./03-file-handling/copyDetails.txt");
