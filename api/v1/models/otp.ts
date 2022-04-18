import { getModelForClass, mongoose, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class LoginOTPs implements TimeStamps {
  @prop({ type: String })
  contactNumber: string;

  @prop({ type: String })
  otp: string;

  @prop({ type: Number, max: 3 })
  count: number;

  @prop()
  createdAt?: Date;

  @prop()
  updatedAt?: Date;
}

const OTP_MODEL = getModelForClass(LoginOTPs, {
  schemaOptions: {
    collection: "otps",
    timestamps: true,
  },
});
export default OTP_MODEL;