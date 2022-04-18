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
//import { ILocation } from "../interfaces/response.interfaces";

export enum Role {
  RETAILERS="retailers",
  TRADERS_OR_SELLERS="traders_or_sellers",
  MANUFACTURES="manufactures",
}


export class UserFeedbackViewModel {
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  serviceId: mongoose.Types.ObjectId;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  plannerId: mongoose.Types.ObjectId;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  userId: mongoose.Types.ObjectId;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(5)
  rating: number;

  // @Expose()
  // @ValidateNested({each:true})
  // @IsArray()
  // @Type(() => FeedbackReplyViewModel)
  // feedback_reply: FeedbackReplyViewModel[];
}
export class FeedbackReplyViewModel {
  @Expose()
  @IsMongoId()
  parentId: mongoose.Types.ObjectId;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  feedbackId: mongoose.Types.ObjectId;

  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  reply: string;
}

export class reference {
  @Expose()
  @IsMongoId()
  reference_id: mongoose.Types.ObjectId;
}

export class DeviceTokenViewModel {
  @Expose()
  @IsDefined()
  @IsString()
  deviceToken: string;
}

export class UpdateProfileViewModel {
  @Expose()
  @IsDefined()
  @IsOptional()
  @IsString()
  name?: string;

  @Expose()
  @IsDefined()
  @IsOptional()
  @IsString()
  image?: string;

  @Expose()
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  workExperience?: number;

  @Expose()
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  city?: string;

  @Expose()
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  state?: string;

  @Expose()
  @IsOptional()
  @IsDefined()
  @IsNumber()
  country?: string;

  @Expose()
  @IsOptional()
  @IsDefined()
  @IsNumber()
  location?: string; //ILocation;

  @Expose()
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  contactNumber?: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  daysBeforeBooking?: number;
}
