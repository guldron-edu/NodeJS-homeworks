const { Sequelize, DataTypes } = require("sequelize");

require("dotenv").config();
const uriDb = process.env.URI_DB_postgres;
// Connect to DB
const sequelize = new Sequelize(uriDb);
// define model
sequelize.define("Contact", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// sync model with DB
sequelize.sync();

module.exports = sequelize;
