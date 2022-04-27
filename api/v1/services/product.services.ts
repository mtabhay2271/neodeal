import { Request } from "express";

import { ICommonServices } from "../interfaces/response.interfaces";
import _ from "lodash";
import responseMessages from "../common/response.messages";
import { DocumentType } from "@typegoose/typegoose";

import ProductsModel from "../models/products.model";

class OrderServicesData {

  getProducts = async (req: Request,
  ): Promise<ICommonServices> => {
    try {
      let products = await ProductsModel.find().populate("brandId").populate("categoryId").lean();
      // let products = await ProductsModel.find().populate("brandId").populate("categoryId").populate("productImages").populate("productSizes").populate("subCategoryId").lean();
      if (products.length) {
        return {
          statusCode: 200,
          data: {
            success: true,
            data: true,
            message: "found",
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


}

export default new OrderServicesData();
