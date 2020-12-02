const app = require("./app.js");
const database = require("./database/db.js");

const PORT = process.env.PORT || 3000;

database
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Use port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Something wrong. Error message: ${err.message}`);
  });
