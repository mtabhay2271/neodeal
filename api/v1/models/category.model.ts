import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { UploadModel } from './upload.model'

export class CategoryModel {

  @prop({ required: true })
  name: string;

  @prop({ default: false })
  description!: string;

  @prop({ default: 0 })
  order!: number;

  @prop({ default: true })
  isActive: boolean;

  @prop({
    required: true,
    ref: UploadModel,
    type: mongoose.Types.ObjectId,
  })
  url: Ref<UploadModel>;
}

const Category_model = getModelForClass(CategoryModel, {
  schemaOptions: {
    collection: "categories",
    timestamps: true,
  },
});

export default Category_model;
