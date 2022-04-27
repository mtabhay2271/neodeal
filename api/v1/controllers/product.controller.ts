import { Request, Response, NextFunction } from "express";
import responseMessages from "../common/response.messages";
import utility, { Validation } from "../common/utility";
import { ICommonController } from "../interfaces/response.interfaces";
import Services from "../services/product.services";
import { AddToWishListViewModel } from "../view-models/product_add_to_wishlist";

class ProductControllersData {
  addProduct = async (
    req: Request,
    res: Response<ICommonController>,
    next: NextFunction
  ) => {
    // try {
    //   let validatedData: Validation = await utility.validateAndConvert(
    //     AddToWishListViewModel,
    //     JSON.parse(`{"productId":"${req.params.productId}"}`)
    //   );
    //   if (validatedData.error) {
    //     return res.status(400).send({
    //       success: false,
    //       message: responseMessages.VALIDATION_ERROR,
    //       error: validatedData.error,
    //     });
    //   } else {
    //     let addToWishListViewModel: AddToWishListViewModel =
    //       validatedData.data as AddToWishListViewModel;

    //     let user = await Services.addToWishList(req, addToWishListViewModel);
    //     return res.status(user.statusCode).send(user.data);
    //   }
    // } catch (error) {
    //   return res.status(500).send({
    //     success: false,
    //     message: responseMessages.ERROR_ISE,
    //     error,
    //   });
    // }
  };

  getProducts = async (
    req: Request,
    res: Response<ICommonController>,
    next: NextFunction
  ) => {
    try {
      let user
      user = await Services.getProducts(req);
      return res.status(user.statusCode).send(user.data);

    } catch (error) {
      return res.status(500).send({
        success: false,
        message: responseMessages.ERROR_ISE,
        error,
      });
    }
  };

  getProductById = async (
    req: Request,
    res: Response<ICommonController>,
    next: NextFunction
  ) => {
    // try {
    //   let validatedData: Validation = await utility.validateAndConvert(
    //     AddOrderViewModel,
    //     req.body
    //   );
    //   if (validatedData.error) {
    //     return res.status(400).send({
    //       success: false,
    //       message: responseMessages.VALIDATION_ERROR,
    //       error: validatedData.error,
    //     });
    //   } else {
    //     let orderViewmodel: AddOrderViewModel =
    //       validatedData.data as AddOrderViewModel;

    //     let user = await Services.placeOrder(req, orderViewmodel);
    //     return res.status(user.statusCode).send(user.data);
    //   }
    // } catch (error) {
    //   return res.status(500).send({
    //     success: false,
    //     message: responseMessages.ERROR_ISE,
    //     error,
    //   });
    // }
  };

  updateProduct = async (
    req: Request,
    res: Response<ICommonController>,
    next: NextFunction
  ) => {
    // try {
    //   let validatedData: Validation = await utility.validateAndConvert(
    //     UpdatePaymentStatusViewModel,
    //     JSON.parse(`{"_id":"${req.params._id}"}`)
    //   );
    //   if (validatedData.error) {
    //     return res.status(400).send({
    //       success: false,
    //       message: responseMessages.VALIDATION_ERROR,
    //       error: validatedData.error,
    //     });
    //   } else {
    //     let user = await Services.paymentStatus(req);
    //     return res.status(user.statusCode).send(user.data);
    //   }
    // } catch (error) {
    //   return res.status(500).send({
    //     success: false,
    //     message: responseMessages.ERROR_ISE,
    //     error,
    //   });
    // }
  };

  deleteProduct = async (
    req: Request,
    res: Response<ICommonController>,
    next: NextFunction
  ) => {
    // try {
    //   let validatedData: Validation = await utility.validateAndConvert(
    //     DeleteFromWishListViewModel,
    //     JSON.parse(`{"productId":"${req.params.productId}"}`)
    //   );
    //   if (validatedData.error) {
    //     return res.status(400).send({
    //       success: false,
    //       message: responseMessages.VALIDATION_ERROR,
    //       error: validatedData.error,
    //     });
    //   } else {
    //     let deletionResult = await Services.deleteFromWishList(req);
    //     return res.status(deletionResult.statusCode).send(deletionResult.data);
    //   }
    // } catch (error) {
    //   return res.status(500).send({
    //     success: false,
    //     message: responseMessages.ERROR_ISE,
    //     error,
    //   });
    // }
  };
}
export default new ProductControllersData();
