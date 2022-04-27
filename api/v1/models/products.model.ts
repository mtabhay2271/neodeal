import { getModelForClass, Index, mongoose, prop, Ref } from "@typegoose/typegoose";
import { CategoryModel } from './category.model'
import { BrandModel } from './brands.model'
// import { ProductsImagesModel } from './productsImages.model'
// import { ProductsSizeModel } from './productsSize.model'
// import { SubCategoriesModel } from './subCategories.model'

export class ProductModel {

  @prop({ required: true })
  batchId!: string;

  @prop({
    required: true,
    ref: BrandModel,
    type: mongoose.Types.ObjectId,
  })
  brandId: Ref<BrandModel>;

  @prop({ default: " " })
  cashPrice!: string;

  @prop({
    required: true,
    ref: CategoryModel,
    type: mongoose.Types.ObjectId,
  })
  categoryId: Ref<CategoryModel>;

  @prop({ required: true })
  costPrice!: string;

  @prop({ default: true })
  creditPrice: string;

  @prop({ default: false })
  featuredImage!: string;

  @prop({ default: false })
  longDescription!: string;

  @prop({ default: false })
  manufacturerSKU!: string;

  @prop({ default: false })
  maxQty!: string;

  @prop({ default: false })
  minQty!: string;

  @prop({ default: false })
  name!: string;

  // @prop({
  //   required: true,
  //   ref: ProductsImagesModel,
  //   type: mongoose.Types.ObjectId,
  // })
  // productImages: Ref<ProductsImagesModel>;

  // @prop({
  //   required: true,
  //   ref: ProductsSizeModel,
  //   type: mongoose.Types.ObjectId,
  // })
  // productSizes: Ref<ProductsSizeModel>;

  @prop({ default: false })
  sortDescription!: string;

  // @prop({
  //   required: true,
  //   ref: SubCategoriesModel,
  //   type: mongoose.Types.ObjectId,
  // })
  // subCategoryId: Ref<SubCategoriesModel>;

}

const Product_model = getModelForClass(ProductModel, {
  schemaOptions: {
    collection: "produts",
    timestamps: true,
  },
});

export default Product_model;
