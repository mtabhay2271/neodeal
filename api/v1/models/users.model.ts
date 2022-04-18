import { getModelForClass, Index, mongoose, prop } from "@typegoose/typegoose";
//import { IImageDatabaseObj } from "../interfaces/data.interfaces";

export class GeoJson {
  @prop({
    default: "Point",
  })
  type!: string;

  @prop()
  coordinates!: number[];
}
@Index({ location: "2dsphere" })
export class User {
  @prop({ required: true })
  contactNumber!: string;

  @prop({ required: true })
  password!: string;

  @prop({ required: true })
  role!: string;

  @prop({ default: " " })
  name!: string;
  @prop({ default: " " })
  email!: string;

  @prop({ default: " " })
  business_name!: string;
  @prop({ default: " " })
  gstin!: string;

  @prop({ default: " " })
  lat!: string;

  @prop({ default: " " })
  longtitude!: string;

  @prop({ default: " " })
  pincode!: number;

  @prop({ default: " " })
  business_category!: string;

  @prop({
    type: GeoJson,
    _id: false,
  })
  location!: GeoJson;

  @prop()
  image!: any; //IImageDatabaseObj;

  // @prop()
  // state!: string;

  // @prop()
  // city!: string;

  // @prop()
  // country!: string;
  // @prop()
  // otp!: string;
}

const USER_DB_MODEL = getModelForClass(User, {
  schemaOptions: {
    collection: "users",
    timestamps: true,
  },
});

export default USER_DB_MODEL;
