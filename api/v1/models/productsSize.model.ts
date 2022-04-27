import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { ProductModel } from 'aaa/nd/27-04-neo_deal/api/v1/models/products.model'

export class ProductsSizeModel {
    @prop({
        required: true,
        ref: ProductModel,
        type: mongoose.Types.ObjectId,
    })
    productId: Ref<ProductModel>;

    @prop({ required: false, default: { qty: 0 } })
    xs: { qty: number };

    @prop({ required: false, default: { qty: 0 } })
    s: { qty: number };

    @prop({ required: false, default: { qty: 0 } })
    m: { qty: number };

    @prop({ required: false, default: { qty: 0 } })
    l: { qty: number };

    @prop({ required: false, default: { qty: 0 } })
    xl: { qty: number };

    @prop({ required: false, default: { qty: 0 } })
    xxl: { qty: number };


}

const ProductsSize_model = getModelForClass(ProductsSizeModel, {
    schemaOptions: {
        collection: "productsSize",
        timestamps: true,
    },
});

export default ProductsSize_model;
