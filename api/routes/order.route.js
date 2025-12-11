import express from 'express';
import { acceptedOrders, completedOrders, deleteOrders, listOrders, placeOrder, rejectedOrders, updateStatus, userOrders } from '../controllers/order.controller.js';
import { protectAdmin } from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", placeOrder);
orderRouter.get("/listcar",protectAdmin, listOrders);
orderRouter.get("/acceptedorders",protectAdmin, acceptedOrders);
orderRouter.get("/rejectedorders", protectAdmin, rejectedOrders);
orderRouter.post("/deleteorders", deleteOrders);
orderRouter.post("/status", updateStatus);
orderRouter.get("/completedorders", protectAdmin, completedOrders);


export default orderRouter;
