const express = require("express");
const cors = require("cors");
var logger = require("morgan");
const app = express();

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { jsonLimite, apiLimite } = require("./helpers/rateLimiter.json");
const { HttpCode } = require("./helpers/constants.js");
const routerContacts = require("./api/contactsRouter.js");
const routerAuth = require("./api/authRouter.js");
const routerUsers = require("./api/usersRouter.js");
const limiter = rateLimit({
  windowMs: apiLimite.windowMs,
  max: apiLimite.max,
});
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limite: jsonLimite }));

app.use("/users", routerUsers);
app.use("/auth", routerAuth);
app.use("/api/contacts", routerContacts);

app.use((req, res, next) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: `unknown route`,
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
