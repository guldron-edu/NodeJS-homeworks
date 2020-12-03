const express = require("express");
const cors = require("cors");
var logger = require("morgan");
const app = express();

const HttpCode = require("./helpers/constants.js");
const routerContacts = require("./api/contacts/api.js");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.use("/api/contacts", routerContacts);

app.use((req, res, next) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: `unknown route - use ${req.baseUrl}/api/contacts`,
    data: "Page not found",
  });
});

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === 500 ? "fail" : "error",
    code: err.status,
    message: err.message,
    data: err.status === 500 ? "Internal server error" : err.status,
  });
});

module.exports = app;
