const app = require("./app.js");
const sequelize = require("./database/db.js");

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    app.listen(PORT, () => {
      console.log(`Use port: ${PORT}`);
    });
  } catch (error) {
    console.log(`Something wrong. Error message: ${err.message}`);
  }
})(sequelize.authenticate());
