import Router from "express";
import passport from "passport";
import UserStatusController from "../controllers/user-status.controller";
const router = Router();

router.put("/suspend/:_id",
//passport.authenticate("local", { session: false }), 
UserStatusController.accountSuspend);
router.put("/active/:_id",passport.authenticate("jwt", { session: false }), UserStatusController.accountActive);
router.put("/approved/:_id",passport.authenticate("local", { session: false }), UserStatusController.accountApproved);
router.put("/rejected/:_id",passport.authenticate("local", { session: false }), UserStatusController.accountRejected);
router.put("/kycApproved/:_id",passport.authenticate("local", { session: false }), UserStatusController.kycApproved);
router.put("/kycReject/:_id",passport.authenticate("local", { session: false }), UserStatusController.kycReject);
export default router;
