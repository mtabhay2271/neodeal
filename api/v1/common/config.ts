import { Strategy as LocalStrategy } from "passport-local";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import bcrypt from "bcrypt";
import Users from "../models/users.model";
import dotenv from "dotenv";
dotenv.config();
import { SignupViewModel } from "../view-models/auth";
export const strategy = (passport: any) =>
  passport.use(
    new LocalStrategy(
      {
        usernameField: "contactNumber",
        passwordField: "password",
        session: false,
      },
      async function (contactNumber: string, password: string, done: any) {
        await Users.findOne(
          { contactNumber: contactNumber },
          async function (err: any, user: SignupViewModel) {
            if (err) {
              return done(err);
            }
            if (!user) {
              return done(null, false);
            }
            if (user) {
              if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
              } else {
                return done(null, false);
              }
            }
          }
        );
      }
    )
  );
var opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};
export const JwtStrategy = (passport: any) =>
  passport.use(
    new Strategy(opts, function (jwt_payload, done) {
      Users.findOne({ _id: jwt_payload._id, role: jwt_payload.role }, function (err: any, user: any) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user, jwt_payload);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      }
      );
    })
  );
