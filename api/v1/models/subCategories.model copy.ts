import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { CategoryModel } from './category.model'
import { UploadModel } from './upload.model'
import { SubCategoriesModel } from './subCategories.model'

export class SubSubCategoriesModel {

    @prop({ required: true })
    name: string;

    @prop({
        required:true,
        ref: SubCategoriesModel,
        type: mongoose.Types.ObjectId,
    })
    subCategoryId: Ref<SubCategoriesModel>;

    @prop({
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

const SubSubCategories_model = getModelForClass(SubSubCategoriesModel, {
    schemaOptions: {
        collection: "subSubCategories",
        timestamps: true,
    },
});

export default SubSubCategories_model;
