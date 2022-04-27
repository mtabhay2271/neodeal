import { Expose, Type } from "class-transformer";
import {
  IsBoolean,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  Min,
} from "class-validator";

export class AddOrderViewModel {
  @Expose()
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  productId!: string;

  @Expose()
  @IsNotEmpty()
  @IsDefined()
  @IsNumber()
  quantity!: number;
  //update it later after products
  //price should be taken from product table with product id as ref of products

  @Expose()
  @IsNotEmpty()
  @IsDefined()
  @IsNumber()
  price!: number;

  @Expose()
  @IsNotEmpty()
  @IsDefined()
  @IsBoolean()
  isPaymentDone!: boolean;
}
