// import bcrypt from "bcrypt";
// import { Request } from "express";
// import { ICommonServices } from "../interfaces/response.interfaces";
// import Users, { UserModel } from "../models/users.model";
// import { SignupViewModel } from "../view-models/auth";
// import utility from "../common/utility";
// import { DocumentType } from "@typegoose/typegoose";
// import _ from "lodash";
// import responseMessages from "../common/response.messages";
// import { IUserDetails } from "../interfaces/data.interfaces";
// import roleConstants from "../common/constants/role.constants";


// class UserServicesData {
//   signup = async (req: Request, signupViewModel: SignupViewModel): Promise<ICommonServices> => {
//     try {
//       let verifiedEmail = await Users.findOne({ email: signupViewModel.email });
//       if (verifiedEmail) {
//         return {
//           statusCode: 409,
//           data: { success: false, message: responseMessages.EMAIL_EXIST }
//         };
//       } else {
//         const salt = await bcrypt.genSalt(10);
//         signupViewModel.password = await bcrypt.hash(signupViewModel.password, salt);
//         let newUser = await Users.create(signupViewModel);
//         if (newUser) {
//           newUser.password = '';
//           return { statusCode: 200, data: { success: true, data: newUser, message: responseMessages.USER_SIGNUP } };
//         } else {
//           return { statusCode: 400, data: { success: false, message: responseMessages.USER_SIGNUP_NOT } };
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
//     }
//   };

//   login = async (req: Request): Promise<ICommonServices> => {
//     try {
//       let foundUser = req.user as DocumentType<UserModel>;
//       if (!foundUser) {
//         return {
//           statusCode: 400,
//           data: {
//             success: false,
//             message: responseMessages.USER_FOUND_NOT,
//           },
//         };
//       } else {
//         return {
//           statusCode: 200,
//           data: {
//             success: true,
//             message: responseMessages.USER_LOGIN,
//             data: {
//               email: foundUser.email,
//               name: foundUser.name,
//               role: foundUser.role,
//               daysBeforeBooking: foundUser.daysBeforeBooking,
//               workExperience: foundUser.workExperience,
//               _id: foundUser._id,
//               image: foundUser.image ? foundUser.image.url : "",
//               token: utility.signJWT(
//                 {
//                   email: foundUser.email,
//                   _id: foundUser._id,
//                   role: foundUser.role,
//                 },
//                 "1d"
//               ),
//             }
//           }
//         };
//       }
//     } catch (error) {
//       return {
//         statusCode: 500,
//         data: {
//           success: false,
//           message: responseMessages.ERROR_OCCURRE,
//           error
//         }
//       };
//     }
//   };

//   userDetails = async (req: Request): Promise<ICommonServices> => {
//     try {
//       let userDetail = await Users.findById(req.params.userId, { password: 0 });
//       if (userDetail) {
//         let data: IUserDetails = {
//           _id: userDetail._id,
//           name: userDetail.name,
//           email: userDetail.email,
//           image: userDetail.image ? userDetail.image.url : '',
//           contactNumber: userDetail.contactNumber,
//           location: userDetail.location,
//           country: userDetail.country,
//           city: userDetail.city,
//         }
//         if (userDetail.role === roleConstants.planner) {
//           data.workExperience = userDetail.workExperience;
//           data.daysBeforeBooking = userDetail.daysBeforeBooking;
//         }
//         return {
//           statusCode: 200,
//           data: {
//             success: true,
//             message: responseMessages.USER_DETAILS_FOUND,
//             data
//           }
//         };
//       } else {
//         return { statusCode: 200, data: { success: false, message: responseMessages.USER_DETAILS_FOUND_NOT } };
//       }
//     } catch (error) {
//       console.log(error);
//       return { statusCode: 500, data: { success: false, message: responseMessages.ERROR_OCCURRE } };
//     }
//   };
// }
// export default new UserServicesData();
