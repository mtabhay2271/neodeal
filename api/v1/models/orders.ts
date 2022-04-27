import { getModelForClass, Index, mongoose, prop, Ref } from "@typegoose/typegoose";
import { User } from "./users.model";

export class Order {
  @prop()
  userId!: Ref<User>;

  @prop({ required: true })
  productId!: string;

  @prop({ required: true })
  quantity!: number;

  @prop()
  price: number;

  @prop({ default: false })
  isPaymentDone: boolean;
}

const ORDER_DB_MODEL = getModelForClass(Order, {
  schemaOptions: {
    collection: "orders",
    timestamps: true,
  },
});

export default ORDER_DB_MODEL;
