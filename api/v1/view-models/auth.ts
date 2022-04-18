import { mongoose } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  isDefined,
  IsDefined,
  IsEmail,
  IsEnum,
  IsMongoId,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";
import { Role } from "./users";
//import { ILocation } from "../interfaces/response.interfaces";

export class SignupViewModel {
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  contactNumber!: string;

  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  password!: string;

  @Expose()
  @IsDefined()
  @IsString()
  @IsEnum(Role, {
    each: true,
    message:
      "user role must be from one of them i.e. retailers,traders_or_sellers,manufactures,",
  })
  role!: string;

  @Expose()
  flag!: string;

  @IsOptional()
  @Expose()
  @IsDefined()
  @IsEmail()
  email!: string;

  @IsOptional()
  @Expose()
  @IsDefined()
  @IsString()
  name!: string;

  @Expose()
  @IsOptional()
  @IsDefined()
  location?: any; //ILocation;
}

export class LoginViewModel {
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  contactNumber!: string;
  
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  password!: string;
}

export class ChangePasswordViewModel {
  @Expose()
  @IsDefined()
  @IsString()
  oldPassword: string;

  @Expose()
  @IsDefined()
  @IsString()
  newPassword: string;
}

export class ForgetPasswordViewModel {
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  contactNumber: string;
}

export class ResetPasswordViewModel {
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  contactNumber: string;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  otp: string;

  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
