import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { UploadModel } from './upload.model'


export class BrandModel {

  @prop({ required: true })
  name: string;

  @prop({
    required: true,
    ref: UploadModel,
    type: mongoose.Types.ObjectId,
  })
  icon: Ref<UploadModel>;

  @prop({ default: true })
  isActive: boolean;

}

const Brand_model = getModelForClass(BrandModel, {
  schemaOptions: {
    collection: "brands",
    timestamps: true,
  },
});

export default Brand_model;
