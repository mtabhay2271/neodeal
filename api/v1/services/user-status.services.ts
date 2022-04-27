import { ICommonServices } from "../interfaces/response.interfaces";
import UserModel, { User } from "../models/users.model";
import _, { replace } from "lodash";
import { Request } from "express";
import responseMessages from "../common/response.messages";
import { CheckMongoIdViewmodel } from "../view-models/common";
import { DocumentType } from "@typegoose/typegoose";
import jwtDecode from "jwt-decode";

class UserStatusServicesData {
  accountActive = async (
    req: Request,
    model: CheckMongoIdViewmodel
  ): Promise<ICommonServices> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      if (userDetails.userType == "Admin") {
        let foundUser = await UserModel.findById(model._id);
        if (foundUser) {
          let updatedAccountResult = await UserModel.findByIdAndUpdate(
            model._id,
            { isActive: true }
          );
          if (updatedAccountResult)
            return {
              statusCode: 200,
              data: {
                success: true,
                message: responseMessages.USER_STATUS_UPDATED,
              },
            };
          else
            return {
              statusCode: 200,
              data: {
                success: false,
                message: responseMessages.USER_STATUS_UPDATED_NOT,
              },
            };
        } else {
          return {
            statusCode: 400,
            data: { success: false, message: responseMessages.USER_FOUND_NOT },
          };
        }
      } else
        return {
          statusCode: 401,
          data: {
            success: false,
            message: responseMessages.USER_NOT_AUTHORIZED,
          },
        };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        data: { success: false, message: responseMessages.ERROR_OCCURRE },
      };
    }
  };

  accountSuspend = async (
    req: Request,
    model: CheckMongoIdViewmodel
  ): Promise<ICommonServices> => {
    try {
      // req.headers["authorization"]?.replace("Bearer ", "");
      //let userDetails = <DocumentType<User>>req.user;
      let token=req.headers["authorization"]?.replace("Bearer ","");
      if(token)
      {let userDetails:any = jwtDecode(token);

      if (userDetails.userType == "Admin") {
        let foundUser = await UserModel.findById(model._id);
        if (foundUser) {
          let updatedAccountResult = await UserModel.findByIdAndUpdate(
            model._id,
            { isActive: false }
          );
          if (updatedAccountResult)
            return {
              statusCode: 200,
              data: {
                success: true,
                message: responseMessages.USER_STATUS_UPDATED,
              },
            };
          else
            return {
              statusCode: 200,
              data: {
                success: false,
                message: responseMessages.USER_STATUS_UPDATED_NOT,
              },
            };
        } else {
          return {
            statusCode: 400,
            data: { success: false, message: responseMessages.USER_FOUND_NOT },
          };
        }
      } else
        return {
          statusCode: 401,
          data: {
            success: false,
            message: responseMessages.USER_NOT_AUTHORIZED,
          },
        };}else return{
          statusCode: 400,
          data: {
            success: false,
            message: responseMessages.TOKEN_FOUND_NOT,
          }}


        
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        data: { success: false, message: responseMessages.ERROR_OCCURRE },
      };
    }
  };

  accountApproved = async (
    req: Request,
    model: CheckMongoIdViewmodel
  ): Promise<ICommonServices> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      if (userDetails.userType == "Admin") {
        let foundUser = await UserModel.findById(model._id);
        if (foundUser) {
          let updatedAccountResult = await UserModel.findByIdAndUpdate(
            model._id,
            { isApproved: true }
          );
          if (updatedAccountResult)
            return {
              statusCode: 200,
              data: {
                success: true,
                message: responseMessages.USER_STATUS_UPDATED,
              },
            };
          else
            return {
              statusCode: 200,
              data: {
                success: false,
                message: responseMessages.USER_STATUS_UPDATED_NOT,
              },
            };
        } else {
          return {
            statusCode: 400,
            data: { success: false, message: responseMessages.USER_FOUND_NOT },
          };
        }
      } else
        return {
          statusCode: 401,
          data: {
            success: false,
            message: responseMessages.USER_NOT_AUTHORIZED,
          },
        };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        data: { success: false, message: responseMessages.ERROR_OCCURRE },
      };
    }
  };
  
  accountRejected = async (
    req: Request,
    model: CheckMongoIdViewmodel
  ): Promise<ICommonServices> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      if (userDetails.userType == "Admin") {
        let foundUser = await UserModel.findById(model._id);
        if (foundUser) {
          let updatedAccountResult = await UserModel.findByIdAndUpdate(
            model._id,
            { isApproved: false }
          );
          if (updatedAccountResult)
            return {
              statusCode: 200,
              data: {
                success: true,
                message: responseMessages.USER_STATUS_UPDATED,
              },
            };
          else
            return {
              statusCode: 200,
              data: {
                success: false,
                message: responseMessages.USER_STATUS_UPDATED_NOT,
              },
            };
        } else {
          return {
            statusCode: 400,
            data: { success: false, message: responseMessages.USER_FOUND_NOT },
          };
        }
      } else
        return {
          statusCode: 401,
          data: {
            success: false,
            message: responseMessages.USER_NOT_AUTHORIZED,
          },
        };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        data: { success: false, message: responseMessages.ERROR_OCCURRE },
      };
    }
  };

  kycApproved = async (
    req: Request,
    model: CheckMongoIdViewmodel
  ): Promise<ICommonServices> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      if (userDetails.userType == "Admin") {
        let foundUser = await UserModel.findById(model._id);
        if (foundUser) {
          let updatedAccountResult = await UserModel.findByIdAndUpdate(
            model._id,
            { isKycApproved: true }
          );
          if (updatedAccountResult)
            return {
              statusCode: 200,
              data: {
                success: true,
                message: responseMessages.USER_STATUS_UPDATED,
              },
            };
          else
            return {
              statusCode: 200,
              data: {
                success: false,
                message: responseMessages.USER_STATUS_UPDATED_NOT,
              },
            };
        } else {
          return {
            statusCode: 400,
            data: { success: false, message: responseMessages.USER_FOUND_NOT },
          };
        }
      } else
        return {
          statusCode: 401,
          data: {
            success: false,
            message: responseMessages.USER_NOT_AUTHORIZED,
          },
        };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        data: { success: false, message: responseMessages.ERROR_OCCURRE },
      };
    }
  };

  kycReject = async (
    req: Request,
    model: CheckMongoIdViewmodel
  ): Promise<ICommonServices> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      if (userDetails.userType == "Admin") {
        let foundUser = await UserModel.findById(model._id);
        if (foundUser) {
          let updatedAccountResult = await UserModel.findByIdAndUpdate(
            model._id,
            { isKycApproved: false }
          );
          if (updatedAccountResult)
            return {
              statusCode: 200,
              data: {
                success: true,
                message: responseMessages.USER_STATUS_UPDATED,
              },
            };
          else
            return {
              statusCode: 200,
              data: {
                success: false,
                message: responseMessages.USER_STATUS_UPDATED_NOT,
              },
            };
        } else {
          return {
            statusCode: 400,
            data: { success: false, message: responseMessages.USER_FOUND_NOT },
          };
        }
      } else
        return {
          statusCode: 401,
          data: {
            success: false,
            message: responseMessages.USER_NOT_AUTHORIZED,
          },
        };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        data: { success: false, message: responseMessages.ERROR_OCCURRE },
      };
    }
  };
}
export default new UserStatusServicesData();
