import { Strategy as LocalStrategy } from "passport-local";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import bcrypt from "bcrypt";
import Users from "../models/users.model";
import dotenv from "dotenv";
dotenv.config();
import otpModel from "../models/otp"
import { VerifyOtpViewModel } from "../view-models/auth";
export const strategy = (passport: any) =>
  passport.use(
    new LocalStrategy(
      {
        usernameField: "phone",
        passwordField: "otp",
        session: false,
      },
      async function (phone: string, otp: string, done: any) {
        await Users.findOne(
          { phone: phone },
          async function (err: any, user: VerifyOtpViewModel) {
            if (err) {
              return done(err);
            }
            if (!user) {
              return done(null, false);
            }
            if (user) {
              let findUserotp= await otpModel.findOne({phone:user.phone,otp:user.otp})
              if (findUserotp) {
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
      otpModel.findOne({ phone: jwt_payload.phone, otp: jwt_payload.otp }, function (err: any, user: any) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          //let finduser=await UserModel.findOne({phone:})
          return done(null, user, jwt_payload);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      }
      );
    })
  );




  