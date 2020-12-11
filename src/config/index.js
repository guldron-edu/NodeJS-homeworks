const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const { UsersService } = require("../services");
require("dotenv").config();
const JWT_KEY = process.env.JWT_KEY;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_KEY,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const service = new UsersService();
      const user = await service.getById(payload.id);
      if (!user) {
        return done(new Error("User not found"));
      }
      if (!user.token) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);
