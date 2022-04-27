import { getModelForClass, Index, mongoose, prop, Ref } from "@typegoose/typegoose";
import { User } from "./users.model";

export class Wishlist {
  @prop()
  userId!: Ref<User>;

  @prop({ required: true })
  productId!: string;

  }

const Wishlist_DB_MODEL = getModelForClass(Wishlist, {
  schemaOptions: {
    collection: "wishlists",
    timestamps: true,
  },
});

export default Wishlist_DB_MODEL;
