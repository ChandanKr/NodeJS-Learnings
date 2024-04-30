const User = require("../models/user");

async function handleListAllUsers(req, res) {
  //? /users ==> Render HTML Document to get users name in li format
  const allDBUsers = await User.find({});
  const html = `
        <ul>
          ${allDBUsers
            .map(
              (user) =>
                `<li>${user.firstName} ${user.lastName} [${user.gender}] - ${user.email}</li>`
            )
            .join("")}
        </ul>
        `;

  res.send(html);
}

module.exports = { handleListAllUsers };
