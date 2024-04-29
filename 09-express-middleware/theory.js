//! MIDDLEWARE:
//* Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.
//* The next middleware function is commonly denoted by a variable named "next".

//? Middleware functions can perform the following tasks:
// 1: Execute any code.
// 2: Make changes to the request and the response objects.
// 3: End the request-response cycle.
// 4: Call the next middleware function in the stack.

//? Middleware Creation:
// Middleware is created with the use of app.use()

//? Syntax:
app.use((req, res, next) => {
  // some code
  // same tasks
});
