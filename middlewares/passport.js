const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const secretOrKey = process.env.JWT_SECRET;

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    const passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : (passwordsMatch = false);

    if (passwordsMatch) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    done(error);
  }
});
exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: secretOrKey,
  },
  async (jwtPayload, done) => {
    // if (expiresIn > jwtPayload.exp) {
    //   return done(null, false);
    // }
    try {
      const user = await User.findById(jwtPayload._id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
