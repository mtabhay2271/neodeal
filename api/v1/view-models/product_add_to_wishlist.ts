import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
} from "class-validator";

export class AddToWishListViewModel {
  @Expose()
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  productId!: string;

  
}
