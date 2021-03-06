import { Request, Response, NextFunction } from "express";
import responseMessages from "../common/response.messages";
import utility, { Validation } from "../common/utility";
import { ICommonController } from "../interfaces/response.interfaces";
import Services from "../services/auth.services";
import {
  VerifyOtpViewModel,
  SignupViewModel,
  ChangePasswordViewModel,
  ForgetPasswordViewModel,
  ResetPasswordViewModel,
  AdminLoginViewModel
} from "../view-models/auth";
class AuthControllersData {
  signup = async (
    req: Request,
    res: Response<ICommonController>,
    next: NextFunction
  ) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(
        SignupViewModel,
        req.body
      );
      if (validatedData.error) {
        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          error: validatedData.error,
        });
      } else {
        let validated_user: SignupViewModel =
          validatedData.data as SignupViewModel;
        let user = await Services.signup( validated_user);
        return res.status(user.statusCode).send(user.data);
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error,
      });
    }
  };
  verifyOtp = async (
    req: Request,
    res: Response<ICommonController>,
    next: NextFunction
  ) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(
        VerifyOtpViewModel,
        req.body
      );
      if (validatedData.error) {
        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          error: validatedData.error,
        });
      } else {
        let loginViewModel: VerifyOtpViewModel = validatedData.data as VerifyOtpViewModel;
        let user = await Services.verifyOtp( loginViewModel);
        return res.status(user.statusCode).send(user.data);
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error,
      });
    }
  };
  forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(
        ForgetPasswordViewModel,
        req.body
      );
      if (validatedData.error) {
        console.log(validatedData.error);

        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          error: validatedData.error,
        });
      } else {
        let forgetPasswordViewModel: ForgetPasswordViewModel =
          validatedData.data as ForgetPasswordViewModel;
        let response = await Services.forgotPassword( forgetPasswordViewModel);
        return res.status(response.statusCode).send(response.data);
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error,
      });
    }
  };

  changePassword = async (req: Request, res: Response) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(
        ChangePasswordViewModel,
        req.body

      );
      if (validatedData.error) {
        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          error: validatedData.error,
        });
      } else if (
        validatedData.data.oldPassword === validatedData.data.newPassword
      ) {
        return res
          .status(400)
          .send({
            success: false,
            message: responseMessages.USER_OLD_NEW_PASSWORD_SAME,
          });
      } else {
        let model: ChangePasswordViewModel =
          validatedData.data as ChangePasswordViewModel;
        let user = await Services.changePassword(req, model);
        return res.status(user.statusCode).send(user.data);
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error,
      });
    }
  };

  resetPassword = async (req: Request, res: Response) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(
        ResetPasswordViewModel,
        req.body
      );
      if (validatedData.error) {
        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          error: validatedData.error,
        });
      } else {
        let resetPasswordViewModel: ResetPasswordViewModel =
          validatedData.data as ResetPasswordViewModel;
        let response = await Services.resetPassword(resetPasswordViewModel);
        return res.status(response.statusCode).send(response.data);
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error,
      });
    }
  };

  login = async (
    req: Request,
    res: Response<ICommonController>,
    next: NextFunction
  ) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(
        AdminLoginViewModel,
        req.body
      );
      if (validatedData.error) {
        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          error: validatedData.error,
        });
      } else {
        let loginViewModel: AdminLoginViewModel = validatedData.data as AdminLoginViewModel;
        let user = await Services.login( loginViewModel);
        return res.status(user.statusCode).send(user.data);
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error,
      });
    }
  };
}
export default new AuthControllersData();
