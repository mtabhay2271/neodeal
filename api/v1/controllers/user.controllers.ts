// import { Request, Response, NextFunction } from "express";
// import responseMessages from "../common/response.messages";
// import utility, { Validation } from "../common/utility";
// import { ICommonController } from "../interfaces/response.interfaces";
// import Services from "../services/user.services";
// import { LoginViewModel, SignupViewModel,  ChangePasswordViewModel, ForgetPasswordViewModel, ResetPasswordViewModel } from "../view-models/auth";
// class userControllersData {
//   signup = async (req: Request, res: Response<ICommonController>, next: NextFunction) => {
//     try {
//       let validatedData: Validation = await utility.validateAndConvert(SignupViewModel, req.body);
//       if (validatedData.error) {
//         return res.status(400).send({
//           success: false,
//           message: responseMessages.VALIDATION_ERROR,
//           error: validatedData.error,
//         });
//       } else {
//         let validated_user: SignupViewModel = validatedData.data as SignupViewModel;
//         let user = await Services.signup(req, validated_user);
//         return res.status(user.statusCode).send(user.data);
//       }
//     } catch (error) {
//       return res.status(500).send({
//         success: false,
//         message: responseMessages.ERROR_ISE,
//         error
//       });
//     }
//   };

//   login = async (req: Request, res: Response<ICommonController>, next: NextFunction) => {
//     try {
//       let validatedData: Validation = await utility.validateAndConvert(LoginViewModel, req.body);
//       if (validatedData.error) {
//         return res.status(400).send({
//           success: false,
//           message: responseMessages.VALIDATION_ERROR,
//           error: validatedData.error,
//         });
//       } else {
//         let user = await Services.login(req);
//         return res.status(user.statusCode).send(user.data);
//       }
//     } catch (error) {
//       return res.status(500).send({
//         success: false,
//         message: responseMessages.ERROR_ISE,
//         error
//       });
//     }
//   };

//   // registration = async (req: Request, res: Response<ICommonController>, next: NextFunction) => {
//   //   try {
//   //     let validatedData: Validation = await utility.validateAndConvert(UserRegDataViewModel, req.body);
//   //     if (validatedData.error) {
//   //       return res.status(400).send({
//   //         success: false,
//   //         message: "validation error occured.",
//   //         data: validatedData.error
//   //       });
//   //     } else {
//   //       let validated_user: UserRegDataViewModel = validatedData.data as UserRegDataViewModel;
//   //       let user = await Services.registration(req, validated_user);
//   //       return res.status(user.statusCode).send(user.data);
//   //     }
//   //   } catch (error) {
//   //     return res.status(500).send({
//   //       success: false,
//   //       message: responseMessages.ERROR_ISE,
//   //       error
//   //     });
//   //   }
//   // };

//   // addUserProfile = async (req: Request, res: Response<ICommonController>, next: NextFunction) => {
//   //   try {
//   //     let added_profile = await Services.addUserProfile(req);
//   //     return res.status(added_profile.statusCode).send(added_profile.data);
//   //   } catch (error) {
//   //     return res.status(500).send({
//   //       success: false,
//   //       message: responseMessages.ERROR_ISE,
//   //       error
//   //     });
//   //   }
//   // };

//   // updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
//   //   try {
//   //     let validatedData: Validation = await utility.validateAndConvert(UpdateProfileViewModel, req.body);
//   //     if (validatedData.error) {
//   //       return res.status(400).send({
//   //         success: false,
//   //         message: "validation error occured.",
//   //         data: validatedData.error
//   //       });
//   //     } else {
//   //       let reqBodyData: UpdateProfileViewModel = validatedData.data as UpdateProfileViewModel;
//   //       let updatedUser = await Services.updateUserProfile(req, reqBodyData);
//   //       return res.status(updatedUser.statusCode).send(updatedUser.data);
//   //     }
//   //   } catch (error) {
//   //     return res.status(500).send({ success: false, message: responseMessages.ERROR_ISE, error });
//   //   }
//   // };

//   // updateProfilePictuer = async (req: Request, res: Response, next: NextFunction) => {
//   //   try {
//   //     let updatedProfile = await Services.updateProfilePictuer(req);
//   //     return res.status(updatedProfile.statusCode).send(updatedProfile.data);
//   //   } catch (error) {
//   //     return res.status(500).send({ success: false, message: responseMessages.ERROR_ISE, error });
//   //   }
//   // };

//   // removeProfilePictuer = async (req: Request, res: Response) => {
//   //   try {
//   //     let deletedData = await Services.removeProfilePictuer(req);
//   //     return res.status(deletedData.statusCode).send(deletedData.data);
//   //   } catch (error) {
//   //     return res.status(500).send({
//   //       success: false,
//   //       message: responseMessages.ERROR_ISE,
//   //       error
//   //     });
//   //   }
//   // };

//   // userDetails = async (req: Request, res: Response<ICommonController>) => {
//   //   try {
//   //     let user = await Services.userDetails(req);
//   //     return res.status(user.statusCode).send(user.data);
//   //   } catch (error) {
//   //     return res.status(500).send({
//   //       success: false,
//   //       message: responseMessages.ERROR_ISE,
//   //       error
//   //     });
//   //   }
//   // };


//   // updateDeviceToken = async (req: Request, res: Response) => {
//   //   try {//deviceToken

//   //     let validatedData: Validation = await utility.validateAndConvert(DeviceTokenViewModel, req.body);
//   //     if (validatedData.error) {
//   //       return res.status(400).send({
//   //         success: false,
//   //         message: "validation error occured.",
//   //         data: validatedData.error
//   //       });
//   //     } else {
//   //       let reqBodyData: DeviceTokenViewModel = validatedData.data as DeviceTokenViewModel;
//   //       let user = await Services.updateDeviceToken(req, reqBodyData.deviceToken);
//   //       return res.status(user.statusCode).send(user.data);
//   //     }

//   //   } catch (error) {
//   //     return res.status(500).send({
//   //       success: false,
//   //       message: responseMessages.ERROR_ISE,
//   //       error
//   //     });
//   //   }
//   // };

//   // changePassword = async (req: Request, res: Response) => {
//   //   try {
//   //     let validatedData: Validation = await utility.validateAndConvert(ChangePasswordViewModel, req.body);
//   //     if (validatedData.error) {
//   //       return res.status(400).send({
//   //         success: false,
//   //         message: responseMessages.VALIDATION_ERROR,
//   //         data: validatedData.error
//   //       });
//   //     } else if (validatedData.data.oldPassword === validatedData.data.newPassword) {
//   //       return res.status(400).send({ success: false, message: responseMessages.USER_OLD_NEW_PASSWORD_SAME });
//   //     } else {
//   //       let reqBodyData: ChangePasswordViewModel = validatedData.data as ChangePasswordViewModel;
//   //       let user = await Services.changePassword(req, reqBodyData);
//   //       return res.status(user.statusCode).send(user.data);
//   //     }

//   //   } catch (error) {
//   //     return res.status(500).send({
//   //       success: false,
//   //       message: responseMessages.ERROR_ISE,
//   //       error
//   //     });
//   //   }
//   // };

//   // forgotPassword = async (req: Request, res: Response) => {
//   //   try {
//   //     let validatedData: Validation = await utility.validateAndConvert(ForgetPasswordViewModel, req.body);
//   //     if (validatedData.error) {
//   //       return res.status(400).send({
//   //         success: false,
//   //         message: responseMessages.VALIDATION_ERROR,
//   //         data: validatedData.error
//   //       });
//   //     }  else {
//   //       let reqBodyData: ForgetPasswordViewModel = validatedData.data as ForgetPasswordViewModel;
//   //       let response = await Services.forgotPassword(reqBodyData.email);
//   //       return res.status(response.statusCode).send(response.data);
//   //     }

//   //   } catch (error) {
//   //     return res.status(500).send({
//   //       success: false,
//   //       message: responseMessages.ERROR_ISE,
//   //       error
//   //     });
//   //   }
//   // };

//   // resetPassword = async (req: Request, res: Response) => {
//   //   try {
//   //     let validatedData: Validation = await utility.validateAndConvert(ResetPasswordViewModel, req.body);
//   //     if (validatedData.error) {
//   //       return res.status(400).send({
//   //         success: false,
//   //         message: responseMessages.VALIDATION_ERROR,
//   //         data: validatedData.error
//   //       });
//   //     }  else {
//   //       let reqBodyData: ResetPasswordViewModel = validatedData.data as ResetPasswordViewModel;
//   //       let response = await Services.resetPassword(reqBodyData);
//   //       return res.status(response.statusCode).send(response.data);
//   //     }

//   //   } catch (error) {
//   //     return res.status(500).send({
//   //       success: false,
//   //       message: responseMessages.ERROR_ISE,
//   //       error
//   //     });
//   //   }
//   // };
// }
// export default new userControllersData();
