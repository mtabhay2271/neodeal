import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { UploadModel } from 'aaa/nd/27-04-neo_deal/api/v1/models/upload.model'

export class BannerModel {

  @prop({ required: true })
  name: string;

  @prop({
    required: true,
    ref: UploadModel,
    type: mongoose.Types.ObjectId,
  })
  url: Ref<UploadModel>;

  @prop({ default: 0 })
  order!: number;

  @prop({ default: true })
  isActive: boolean;

}

const Banner_model = getModelForClass(BannerModel, {
  schemaOptions: {
    collection: "banners",
    timestamps: true,
  },
});

export default Banner_model;
