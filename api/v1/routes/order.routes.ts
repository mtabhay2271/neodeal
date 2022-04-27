import Router from "express";
import passport from "passport";
import OrderController from "../controllers/order.controller";
const router = Router();

router.post(
  "/wishlist/:productId",
  passport.authenticate("local", { session: false }),
  OrderController.addToWishList
);
router.delete(
  "/wishlist/:productId",
  passport.authenticate("local", { session: false }),
  OrderController.deleteFromWishList
);
router.post(
  "/",
  passport.authenticate("local", { session: false }),
  OrderController.placeOrder
);
router.put(
  "/payment/:_id",
  passport.authenticate("local", { session: false }),
  OrderController.paymentStatus
);

export default router;
