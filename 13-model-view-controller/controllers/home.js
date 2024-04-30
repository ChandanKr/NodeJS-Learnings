async function handleHomePage(req, res) {
  const html = `
    <h1> Hello From "HTTP Status Codes" Section</h1>
    <h2 style="color:red"><a href="http://localhost:8000/api/users/" target="_blank">Click here</a> for the users data...</h2>

    <h2 style="color:red"><a href="http://localhost:8000/users/" target="_blank">Click here</a> to get users name in li format</h2>

    <h2 style="color:red"><a href="http://localhost:8000/api/users/1" target="_blank">Click here</a> to get the specific user data (change user id in url after redirecting, default id is 1) </h2>
    `;
  res.send(html);
}

module.exports = { handleHomePage };
