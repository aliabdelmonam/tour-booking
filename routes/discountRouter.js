import express from "express";
import * as discountController from "../controllers/discountController.js";
import { tokenAuth } from "../middlewares/auth.js";

const discountRouter = express.Router();


discountRouter.use(tokenAuth);
discountRouter.route("/").post(discountController.createDiscount);
discountRouter.route("/validate").post(discountController.validateDiscount);
discountRouter.route("/apply").post(discountController.applyDiscount);
discountRouter.route('/').get(discountController.getAllDiscounts);
discountRouter.route('/:id').get(discountController.getDiscountById).patch(discountController.updateDiscount).delete(discountController.deleteDiscount);


export default discountRouter;
