//! URL Shortener

//? Design a URL shortener that takes in a valid URL and returns a shortened URL, redirecting the user to the previously provided URL.

//? Also keep track of total visits/clicks on the URL.

//todo: ROUTES:

//* POST /URL
    // Generates a new short URL and returns the shortened URL in the format "example.com/random-id".

//* GET /:id
    // Redirect the user to the original URL.

//* GET /URL/analytics/:id
    // Returns the click for the provided short id.


//todo: Dependencies Required:

    // express
    // mongoose
    // nodemon
    // shortid "npm i shortid"