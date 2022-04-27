import bcrypt from "bcrypt";
import { Request } from "express";
import requestOBJ from "request";

import { ICommonServices } from "../interfaces/response.interfaces";
import UserModel, { User } from "../models/users.model";
import {
  ChangePasswordViewModel,
  ForgetPasswordViewModel,
  VerifyOtpViewModel,
  ResetPasswordViewModel,
  SignupViewModel,
  AdminLoginViewModel
} from "../view-models/auth";
import Utility from "../common/utility";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import otp_model, { LoginOTPs } from "../models/otp";
import jwt_decode from "jwt-decode";
import { model } from "mongoose";
import ComConst from "../common/constants/common.constant"



class AuthServicesData {
  signup = async (signUpModel: SignupViewModel): Promise<ICommonServices> => {
    try {
      let foundUser = await UserModel.findOne({
        phone: signUpModel.phone,
      });
      if (foundUser) {
        let otp = Utility.generateOTP();
        let OTP_API = `http://alots.in/sms-panel/api/http/index.php?username=UNIVERSALOTP&apikey=874D4-FC8F9&apirequest=Template&sender=VIRSOF&mobile=${signUpModel.phone}&TemplateID=1507163557343366272&Values=${otp}&route=OTP&format=JSON`;

        let modelToSave: LoginOTPs = new LoginOTPs();
        modelToSave.otp = otp.toString();
        modelToSave.phone = signUpModel.phone;
        modelToSave.count = 1;
        await requestOBJ(OTP_API);

        let otp_id: string = "";

        let is_otp_sent: boolean = false;
        let found_already_generated_otp = await otp_model.findOne({
          phone: signUpModel.phone,
        });

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

        return {
          statusCode: 200,
          data: {
            success: true,
            message: responseMessages.OTP_SEND,
          },
        };
      } else {
        let otp = Utility.generateOTP();
        let OTP_API = `http://alots.in/sms-panel/api/http/index.php?username=UNIVERSALOTP&apikey=874D4-FC8F9&apirequest=Template&sender=VIRSOF&mobile=${signUpModel.phone}&TemplateID=1507163557343366272&Values=${otp}&route=OTP&format=JSON`;

        let modelToSave: LoginOTPs = new LoginOTPs();
        modelToSave.otp = otp.toString();
        modelToSave.phone = signUpModel.phone;
        modelToSave.count = 1;
        await requestOBJ(OTP_API);

        let otp_id: string = "";

        let is_otp_sent: boolean = false;
        let found_already_generated_otp = await otp_model.findOne({
          phone: signUpModel.phone,
        });

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
        signUpModel.otp = otp;
        let newUser = await UserModel.create(signUpModel);

        if (is_otp_sent)
          return {
            statusCode: 200,
            data: {
              success: true,
              message: responseMessages.OTP_SEND,

            },
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
      console.log(error);
      return {
        statusCode: 500,
        data: { success: false, message: responseMessages.ERROR_OCCURRE },
      };
    }
  };

  verifyOtp = async (loginModel: VerifyOtpViewModel): Promise<ICommonServices> => {
    try {
      let foundUser = await UserModel.findOne({ phone: loginModel.phone });
      if (!foundUser) {
        return {
          statusCode: 400,
          data: {
            success: false,
            message: responseMessages.USER_FOUND_NOT,
          },
        };
      } else if (!foundUser.isActive) {
        return {
          statusCode: 401,
          data: {
            success: false,
            message: "You are temporary suspended",
          },
        };
      } else {

        let isBasicDetails = true;
        if (foundUser.email == " " || foundUser.name == " ")
          isBasicDetails = false;
        let foundUserOtpDoc = await otp_model.findOne({ phone: loginModel.phone })
        if (!foundUserOtpDoc) {
          return {
            statusCode: 401,
            data: {
              success: false,
              message: "Otp not found try with new otp",
            },
          };
        }
        if (foundUserOtpDoc!.otp == loginModel.otp) {
          let token = Utility.signJWT(
            {
              phone: foundUser.phone,
              email: foundUser.email,
              _id: foundUser._id,
              userType: foundUser.userType
            },
            ComConst.TOKEN_EXP
          );
          let deleteOtp = await otp_model.findOneAndDelete({ phone: loginModel.phone })
          return {
            statusCode: 200,
            data: {
              success: true,
              message: responseMessages.USER_LOGIN,
              data: { token, user: { ...foundUser.toObject(), isBasicDetails } },
            },
          };
        } else
          return {
            statusCode: 401,
            data: {
              success: false,
              message: responseMessages.OTP_MISMATCH,
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

  forgotPassword = async (
    forgetPasswordViewModel: ForgetPasswordViewModel
  ): Promise<ICommonServices> => {
    try {
      let foundUser = await UserModel.findOne({
        phone: forgetPasswordViewModel.phone,
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

        let found_already_generated_otp = await otp_model.findOne({
          phone: foundUser.phone,
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

        let OTP_API = `http://alots.in/sms-panel/api/http/index.php?username=UNIVERSALOTP&apikey=874D4-FC8F9&apirequest=Template&sender=VIRSOF&mobile=${foundUser.phone}&TemplateID=1507163557343366272&Values=${otp}&route=OTP&format=JSON`;

        let modelToSave: LoginOTPs = new LoginOTPs();
        modelToSave.otp = otp.toString();
        modelToSave.phone = foundUser.phone;
        modelToSave.count = 1;
        // send message on user phone
        await requestOBJ(OTP_API);
        // twilio_instance.messages.create({
        //   to: foundUser.phone,
        //   body: `Your verification code for neoDeal is ${otp}`,
        //   from: process.env.TWILIO_OTP_FROM,
        // });

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
    resetPasswordModel: ResetPasswordViewModel
  ): Promise<ICommonServices> => {
    try {
      let foundUser = await UserModel.findOne({
        phone: resetPasswordModel.phone,
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
          phone: foundUser.phone,
          otp: resetPasswordModel.otp,
        });
        if (foundDocument) {
          let salt = await bcrypt.genSalt(11);
          let securePassword = await bcrypt.hash(
            resetPasswordModel.newPassword,
            salt
          );
          let result = await UserModel.updateOne(
            { phone: foundUser.phone },
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
              message: responseMessages.OTP_FOUND_NOT,
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
    changePasswordModel: ChangePasswordViewModel
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
        let foundUser = await UserModel.findOne({ phone: payload.phone });

        if (!foundUser) {
          return {
            statusCode: 400,
            data: {
              success: false,
              message: responseMessages.USER_FOUND_NOT,
            },
          };
        } else {
          let verifyUser = await bcrypt.compare(
            changePasswordModel.oldPassword,
            foundUser.password
          );
          if (verifyUser) {
            let salt = await bcrypt.genSalt(11);
            let securePassword = await bcrypt.hash(
              changePasswordModel.newPassword,
              salt
            );
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
                message: responseMessages.USER_NOT_AUTHORIZED,
              },
            };
        }
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

  //Admin Login Api
  login = async (loginModel: AdminLoginViewModel): Promise<ICommonServices> => {
    try {
      let foundUser = await UserModel.findOne({ phone: loginModel.phone });
      if (!foundUser) {
        return {
          statusCode: 400,
          data: {
            success: false,
            message: responseMessages.USER_FOUND_NOT,
          },
        };
      } else {
        let verifyUser = await bcrypt.compare(
          loginModel.password,
          foundUser.password
        );
        if (verifyUser) {
          let token = Utility.signJWT(
            {
              phone: foundUser.phone,
              email: foundUser.email,
              _id: foundUser._id,
              userType: foundUser.userType,
            },
            "1d"
          );
          return {
            statusCode: 200,
            data: {
              success: true,
              message: responseMessages.USER_LOGIN,
              data: { token, ...foundUser.toObject() },
            },
          };
        } else
          return {
            statusCode: 401,
            data: {
              success: false,
              message: responseMessages.PASSWORD_MISMATCH,
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

}

export default new AuthServicesData();
