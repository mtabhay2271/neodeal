import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { ProductModel } from './products.model'

export class ProductsImagesModel {
    @prop({
        required: true,
        ref: ProductModel,
        type: mongoose.Types.ObjectId,
    })
    productId: Ref<ProductModel>;

    @prop({ required: true })
    image: string;

    @prop({ required: true })
    groups: {
        image: string,
        order: number
    };

}

const ProductsImages_model = getModelForClass(ProductsImagesModel, {
    schemaOptions: {
        collection: "productsImages",
        timestamps: true,
    },
});

export default ProductsImages_model;
