import bcrypt from "bcrypt";
import { Request } from "express";
import twilio from "twilio";

import { ICommonServices } from "../interfaces/response.interfaces";
import UserModel, { User } from "../models/users.model";
import {
  ChangePasswordViewModel,
  ForgetPasswordViewModel,
  LoginViewModel,
  ResetPasswordViewModel,
  SignupViewModel,
} from "../view-models/auth";
import Utility from "../common/utility";
import { DocumentType } from "@typegoose/typegoose";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import otp_model, { LoginOTPs } from "../models/otp";
import jwt_decode from "jwt-decode";

class AuthServicesData {
  signup = async (
    req: Request,
    model: SignupViewModel
  ): Promise<ICommonServices> => {
    try {
      let verifiedContactNumber = await UserModel.findOne({
        contactNumber: model.contactNumber,
      });
      if (verifiedContactNumber) {
        return {
          statusCode: 409,
          data: {
            success: false,
            message: responseMessages.USER_EXIST_WITH_CONTACT,
          },
        };
      } else {
        const salt = await bcrypt.genSalt(10);
        model.password = await bcrypt.hash(model.password, salt);
        let newUser = await UserModel.create(model);
        if (newUser) {
          newUser.password = "";
          return {
            statusCode: 200,
            data: {
              success: true,
              data: newUser,
              message: responseMessages.USER_SIGNUP,
            },
          };
        } else {
          return {
            statusCode: 400,
            data: { success: false, message: responseMessages.USER_SIGNUP_NOT },
          };
        }
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        data: { success: false, message: responseMessages.ERROR_OCCURRE },
      };
    }
  };
  login = async (req: Request,model:LoginViewModel): Promise<ICommonServices> => {
    try {
      let foundUser = await UserModel.findOne({contactNumber:model.contactNumber});

      //let foundUser = req.user as DocumentType<UserModel>;
      if (!foundUser) {
        return {
          statusCode: 400,
          data: {
            success: false,
            message: responseMessages.USER_FOUND_NOT,
          },
        };
      } else {
        let verifyUser= await bcrypt.compare(model.password,foundUser.password)
        if (verifyUser) {
      

        return {
          statusCode: 200,
          data: {
            success: true,
            message: responseMessages.USER_LOGIN,
            data: {
              token: Utility.signJWT(
                {
                  contactNumber: foundUser.contactNumber,
                  email: foundUser.email,
                  _id: foundUser._id,
                  role: foundUser.role,
                },
                "1d"
              ),
            },
          },
        };

      }
    else return{

      statusCode: 401,
      data: {
        success: false,
        message: responseMessages.USER_NOT_AUTHORIZED,
        
      },



    }}
    } catch (error) {
      return {
        statusCode: 500,
        data: {
          success: false,
          message: responseMessages.ERROR_OCCURRE,
          error,
        },
      };
    }
  };
  forgotPassword = async (
    req: Request,
    model: ForgetPasswordViewModel
  ): Promise<ICommonServices> => {
    try {
      let foundUser = await UserModel.findOne({
        contactNumber: model.contactNumber,
      });

      //let foundUser = req.user as DocumentType<UserModel>;
      if (!foundUser) {
        return {
          statusCode: 400,
          data: {
            success: false,
            message: responseMessages.USER_FOUND_NOT,
          },
        };
      } else {
        let otp = Utility.generateOTP();
        let is_otp_sent: boolean = false;
        let twilio_instance = twilio(
          process.env.TWILIO_SID,
          process.env.TWILIO_AUTH_TOKEN
        );

        let found_already_generated_otp = await otp_model.findOne({
          contactNumber: foundUser.contactNumber,
        });

        if (
          found_already_generated_otp &&
          found_already_generated_otp.updatedAt
        ) {
          let updatedAt = found_already_generated_otp.updatedAt.toString();
          let now_time = Date.now();
          let differenceOfTime = now_time - Date.parse(updatedAt);

          let previous_otp_sent_before = Math.floor(differenceOfTime / 1000);

          if (previous_otp_sent_before < 31)
            return {
              statusCode: 400,

              data: {
                success: false,
                message: "Please wait for 30 seconds to generate new OTP",
              },
            };
        }

        let modelToSave: LoginOTPs = new LoginOTPs();
        modelToSave.otp = otp.toString();
        modelToSave.contactNumber = foundUser.contactNumber;
        modelToSave.count = 1;
        twilio_instance.messages.create({
          to: foundUser.contactNumber,
          body: `Your verification code for neoDeal is ${otp}`,
          from: process.env.TWILIO_OTP_FROM,
        });

        let otp_id: string = "";
        if (found_already_generated_otp) {
          modelToSave.count += found_already_generated_otp.count;
          let result = await otp_model.updateOne(
            {
              _id: found_already_generated_otp._id,
            },
            modelToSave
          );
          is_otp_sent = result && result.nModified > 0 ? true : false;
          otp_id =
            result && result.nModified > 0
              ? found_already_generated_otp._id
              : "";
        } else {
          let result = await otp_model.create(modelToSave);
          otp_id = result ? result._id : "";
          is_otp_sent = result ? true : false;
        }

        if (is_otp_sent)
          return {
            statusCode: 200,
            data: { success: true, message: responseMessages.OTP_SEND },
          };
        else
          return {
            statusCode: 400,
            data: {
              success: false,
              message: responseMessages.UNABLE_SEND_OTP,
            },
          };
      }
    } catch (error) {
      return {
        statusCode: 500,
        data: {
          success: false,
          message: responseMessages.ERROR_OCCURRE,
          error,
        },
      };
    }
  };
  resetPassword = async (
    req: Request,
    model: ResetPasswordViewModel
  ): Promise<ICommonServices> => {
    try {
      let foundUser = await UserModel.findOne({
        contactNumber: model.contactNumber,
      });

      if (!foundUser) {
        return {
          statusCode: 400,
          data: {
            success: false,
            message: responseMessages.USER_FOUND_NOT,
          },
        };
      } else {
        let foundDocument = await otp_model.findOne({
          contactNumber: foundUser.contactNumber,
          otp: model.otp,
        });
        if (foundDocument) {
          let salt = await bcrypt.genSalt(11);
          let securePassword = await bcrypt.hash(model.newPassword, salt);
          let result = await UserModel.updateOne(
            { contactNumber: foundUser.contactNumber },
            { password: securePassword }
          );
          if (result && result.nModified > 0) {
            return {
              statusCode: 200,
              data: {
                success: true,
                message: responseMessages.PASS_UPDATE,
              },
            };
          } else
            return {
              statusCode: 400,
              data: {
                success: false,
                message: responseMessages.PASS_UPDATE_NOT,
              },
            };
        } else
          return {
            statusCode: 400,
            data: {
              success: false,
              message:responseMessages.OTP_FOUND_NOT
            },
          };
      }
    } catch (error) {
      return {
        statusCode: 500,
        data: {
          success: false,
          message: responseMessages.ERROR_OCCURRE,
          error,
        },
      };
    }
  };
  changePassword = async (
    req: Request,
    model: ChangePasswordViewModel
  ): Promise<ICommonServices> => {
    try {
      let token = req.headers["authorization"]?.replace("Bearer ", "");
      if (!token)
        return {
          statusCode: 400,
          data: {
          success: false,

            message: responseMessages.TOKEN_FOUND_NOT,
          },
        };
      else {
        let payload: any = jwt_decode(token);
      let foundUser = await UserModel.findOne({contactNumber:payload.contactNumber})

      if (!foundUser) {
        return {
          statusCode: 400,
          data: {
            success: false,
            message: responseMessages.USER_FOUND_NOT,
          },
        };
      } else {
        let verifyUser= await bcrypt.compare(model.oldPassword,foundUser.password)
        if (verifyUser) {
          let salt = await bcrypt.genSalt(11);
          let securePassword = await bcrypt.hash(model.newPassword, salt);
          let result = await UserModel.updateOne(
            { _id: foundUser._id },
            { password: securePassword }
          );
          if (result && result.nModified > 0) {
            return {
              statusCode: 200,
              data: {
                success: true,
                message: responseMessages.PASS_UPDATE,
              },
            };
          } else
            return {
              statusCode: 400,
              data: {
                success: false,
                message: responseMessages.PASS_UPDATE_NOT,
              },
            };
        } else
          return {
            statusCode: 401,
            data: {
              success: false,
              message:responseMessages.USER_NOT_AUTHORIZED
            },
          };
      }}
    } catch (error) {
      return {
        statusCode: 500,
        data: {
          success: false,
          message: responseMessages.ERROR_OCCURRE,
          error,
        },
      };
    }
  };
}

export default new AuthServicesData();
