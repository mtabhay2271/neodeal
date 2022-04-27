import { mongoose } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  
} from "class-validator";


export class CheckMongoIdViewmodel {
    @Expose()
    @IsDefined()
    @IsNotEmpty()
    @IsMongoId()
    _id: string;
   
  }
  