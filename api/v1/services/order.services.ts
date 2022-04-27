import bcrypt from "bcrypt";
import { Request } from "express";
import requestOBJ from "request";

import { ICommonServices } from "../interfaces/response.interfaces";
import UserModel, { User } from "../models/users.model";
import Utility from "../common/utility";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import otp_model, { LoginOTPs } from "../models/otp";
import jwt_decode from "jwt-decode";
import { AddOrderViewModel } from "../view-models/orders";
import orderModel, { Order } from "../models/orders";
import { DocumentType } from "@typegoose/typegoose";
import { UpdatePaymentStatusViewModel } from "../view-models/payment";
import { AddToWishListViewModel } from "../view-models/product_add_to_wishlist";
import wishlistModel, { Wishlist } from "../models/wishlist";
import { DeleteFromWishListViewModel } from "../view-models/product_delete_wishlist";

class OrderServicesData {
  addToWishList = async (
    req: Request,
    wishListViewModel: AddToWishListViewModel
  ): Promise<ICommonServices> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let modelToSave = <DocumentType<Wishlist>>wishListViewModel;
      modelToSave.userId = userDetails._id;
      let productAddToWishlistResult = await wishlistModel.create(modelToSave);
      if (productAddToWishlistResult) {
        return {
          statusCode: 200,
          data: {
            success: true,
            data: productAddToWishlistResult,
            message: responseMessages.PROD_ADD_WISHLIST,
          },
        };
      } else {
        return {
          statusCode: 200,
          data: {
            success: false,
            message: responseMessages.PROD_NOT_ADD_WISHLIST,
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
  deleteFromWishList = async (req:Request,
  ): Promise<ICommonServices> => {
    try {

        let userDetails=<DocumentType<User>>req.user;
        let deletionResult = await wishlistModel.findByIdAndDelete(req.params._id);
        if (deletionResult) {
          return {
            statusCode: 200,
            data: {
              success: true,
              data: true,
              message: responseMessages.DELETION_DONE,
            },
          };
        } else {
          return {
            statusCode: 200,
            data: { success: false, message: responseMessages.DELETION_NOT_DONE },
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
  placeOrder = async (
    req: Request,
    addOrderModel: AddOrderViewModel
  ): Promise<ICommonServices> => {
    try {
      let userdetails = <DocumentType<User>>req.user;
      let modelToSave = <DocumentType<Order>>addOrderModel;
      modelToSave.userId = userdetails._id;
      let orderResult = await orderModel.create(modelToSave);
      if (orderResult)
        return {
          statusCode: 200,
          data: {
            success: true,
            message: responseMessages.ORDER_PLACED,
            data: orderResult,
          },
        };
      else
        return {
          statusCode: 200,
          data: {
            success: false,
            message: responseMessages.ORDER_NOT_PLACED,
          },
        };
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
  paymentStatus = async (req: Request): Promise<ICommonServices> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let updatePaymentStatus = await orderModel.findByIdAndUpdate(
        {
          _id: req.params._id,
          userId: userDetails._id,
        },
        { isPaymentDone: true }
      );

      //let foundUser = req.user as DocumentType<UserModel>;
      if (!updatePaymentStatus) {
        return {
          statusCode: 200,
          data: {
            success: false,
            message: responseMessages.PAYMENT_NOT_DONE,
          },
        };
      } else
        return {
          statusCode: 200,
          data: {
            success: true,
            message: responseMessages.PAYMENT_DONE,
          },
        };
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

export default new OrderServicesData();
