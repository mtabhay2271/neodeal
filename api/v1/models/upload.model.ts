import { getModelForClass, Index, mongoose, prop } from "@typegoose/typegoose";


export class UploadModel {

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  url: string;

  @prop({ required: true })
  path: string;

  @prop({ required: false })
  thumbnail: string;

  @prop({ required: false })
  thumbnailPath: string;

}

const Upload_model = getModelForClass(UploadModel, {
  schemaOptions: {
    collection: "upload",
    timestamps: true,
  },
});

export default Upload_model;
