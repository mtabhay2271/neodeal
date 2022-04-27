import { Request, Response, NextFunction } from "express";
import responseMessages from "../common/response.messages";
import utility, { Validation } from "../common/utility";
import { ICommonController } from "../interfaces/response.interfaces";
import Services from "../services/user-status.services";
import {
  CheckMongoIdViewmodel,
} from "../view-models/common";
class userStatusControllersData {
  accountActive = async (
    req: Request,
    res: Response<ICommonController>,
    next: NextFunction
  ) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(
        CheckMongoIdViewmodel,
        JSON.parse(`{"_id":"${req.params._id}"}`)
      );
      if (validatedData.error) {
      console.log(validatedData.error)

        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          error: validatedData.error,
        });
      } else {
        let accountActiveViewmodel: CheckMongoIdViewmodel =
          validatedData.data as CheckMongoIdViewmodel;

        let user = await Services.accountActive(req,accountActiveViewmodel);
        return res.status(user.statusCode).send(user.data);
      }
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error,
      });
    }
  };

  accountSuspend = async (
    req: Request,
    res: Response<ICommonController>,
    next: NextFunction
  ) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(
        CheckMongoIdViewmodel,
        JSON.parse(`{"_id":"${req.params._id}"}`)
      );
      if (validatedData.error) {
        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          error: validatedData.error,
        });
      } else {
        let accountSuspendViewmodel: CheckMongoIdViewmodel =
          validatedData.data as CheckMongoIdViewmodel;

        let user = await Services.accountSuspend(req,accountSuspendViewmodel);
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

  accountApproved = async (
    req: Request,
    res: Response<ICommonController>,
    next: NextFunction
  ) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(
        CheckMongoIdViewmodel,
        JSON.parse(`{"_id":"${req.params._id}"}`)
      );
      if (validatedData.error) {
        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          error: validatedData.error,
        });
      } else {
        let accountRejectViewmodel: CheckMongoIdViewmodel =
          validatedData.data as CheckMongoIdViewmodel;

        let user = await Services.accountApproved(req,accountRejectViewmodel);
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

  accountRejected = async (
    req: Request,
    res: Response<ICommonController>,
    next: NextFunction
  ) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(
        CheckMongoIdViewmodel,
        JSON.parse(`{"_id":"${req.params._id}"}`)
      );
      if (validatedData.error) {
        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          error: validatedData.error,
        });
      } else {
        let accountApprovedViewmodel: CheckMongoIdViewmodel =
          validatedData.data as CheckMongoIdViewmodel;

        let user = await Services.accountRejected(req,accountApprovedViewmodel);
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
  
  kycApproved = async (
    req: Request,
    res: Response<ICommonController>,
    next: NextFunction
  ) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(
        CheckMongoIdViewmodel,
        JSON.parse(`{"_id":"${req.params._id}"}`)
      );
      if (validatedData.error) {
        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          error: validatedData.error,
        });
      } else {
        let kycApprovedViewmodel: CheckMongoIdViewmodel =
          validatedData.data as CheckMongoIdViewmodel;

        let user = await Services.kycApproved(req,kycApprovedViewmodel);
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

  kycReject = async (
    req: Request,
    res: Response<ICommonController>,
    next: NextFunction
  ) => {
    try {
      let validatedData: Validation = await utility.validateAndConvert(
        CheckMongoIdViewmodel,
        JSON.parse(`{"_id":"${req.params._id}"}`)
      );
      if (validatedData.error) {
        return res.status(400).send({
          success: false,
          message: responseMessages.VALIDATION_ERROR,
          error: validatedData.error,
        });
      } else {
        let kycRejectViewmodel: CheckMongoIdViewmodel =
          validatedData.data as CheckMongoIdViewmodel;

        let user = await Services.kycReject(req,kycRejectViewmodel);
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
export default new userStatusControllersData();
