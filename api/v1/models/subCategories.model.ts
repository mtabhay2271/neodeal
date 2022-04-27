import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { CategoryModel } from './category.model'
import { UploadModel } from './upload.model'

export class SubCategoriesModel {

    @prop({ required: true })
    name: string;

    @prop({
        required: true,
        ref: CategoryModel,
        type: mongoose.Types.ObjectId,
    })
    categoryId: Ref<CategoryModel>;

    @prop({
        ref: UploadModel,
        type: mongoose.Types.ObjectId,
    })
    url: Ref<UploadModel>;


    @prop({ required: false })
    description: string;

    @prop({ default: 0 })
    order: number;

    @prop({ default: true })
    isActive: boolean;

}

const SubCategories_model = getModelForClass(SubCategoriesModel, {
    schemaOptions: {
        collection: "subCategories",
        timestamps: true,
    },
});

export default SubCategories_model;
