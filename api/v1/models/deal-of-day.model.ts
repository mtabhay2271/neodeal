import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { BrandModel } from './brands.model'

export class DealOfDayModel {

  @prop({ required: true })
  name: string;
  
  @prop({ default: 'Flash Deal' })
  label: string;
  
  @prop({ required: true })
  description: string;

  @prop({
    required: true,
    ref: BrandModel,
    type: mongoose.Types.ObjectId,
  })
  brand: Ref<BrandModel>;

  @prop({ default: 0 })
  order!: number;

  @prop({ default: true })
  isActive: boolean;

}

const DealOfDay_model = getModelForClass(DealOfDayModel, {
  schemaOptions: {
    collection: "dealOfDay",
    timestamps: true,
  },
});

export default DealOfDay_model;
