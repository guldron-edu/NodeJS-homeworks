const passport = require("passport");
require("../config");
const { HttpCode } = require("./constants");

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (error || !user) {
      return next({
        status: HttpCode.UNAUTORIZED,
        message: "Not authorized",
      });
    }

    req.user = user;
    return next();
  })(req, res, next);
};
module.exports = guard;
