import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { Role } from "./users";

export class SignupViewModel {
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  phone!: string;

  @Expose()
  
  otp!: number;

  @Expose()
  @IsDefined()
  @IsString()
  @IsEnum(Role, {
    each: true,
    message:
      "user type must be from one of them i.e. Retailers,Traders_or_sellers,Manufactures,",
  })
  userType!: string;

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

export class VerifyOtpViewModel {
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  phone!: string;
  
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  otp!: string;
}
export class AdminLoginViewModel {
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  phone!: string;
  
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
  phone: string;
}

export class ResetPasswordViewModel {
  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  phone: string;

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
