import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import _ from "lodash";
import TimeConst from "./constants/time.constants";
dotenv.config();


const secret_key = process.env.SECRET_KEY || '';


export class Validation {
  data: any;
  error: any;
}

class Utility {
  validateAndConvert = async (validateData: any, body: any) => {
    const result = new Validation();
    result.data = plainToClass(validateData, body);
    await validate(result.data, { skipMissingProperties: true }).then(
      (errors) => {
        if (errors.length > 0) {
          result.error = errors.map((err) => err.constraints);
          return result;
        }
      }
    );
    return result;
  };

  signJWT = (payload: any, expires_in?: string): string => {
    let jwtToken = jwt.sign(payload, secret_key, {
      expiresIn: expires_in ?? TimeConst.DEFAULT_EXP_TIME,
    });
    return jwtToken;
  };
  generateOTP = (): number => Math.floor(100000 + Math.random() * 900000);


};


export default new Utility();