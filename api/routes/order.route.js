import express from "express";
import {
  deleteOrder,
  getAllOrders,
  placeOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { protectAdmin } from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", placeOrder);
orderRouter.get("/allorders", protectAdmin, getAllOrders);
orderRouter.get("/allorders/:orderID", protectAdmin, getAllOrders);
orderRouter.delete("/deleteorders/:orderId", protectAdmin, deleteOrder);
orderRouter.post("/status", updateOrderStatus);

export default orderRouter;
