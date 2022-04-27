
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
} from "class-validator";

export class UpdatePaymentStatusViewModel {
  @Expose()
  @IsDefined()
  @IsMongoId()
  @IsNotEmpty()
  _id!: string;

  
}
