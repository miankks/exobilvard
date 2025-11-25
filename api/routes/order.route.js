import express from 'express';
import { acceptedOrders, completedOrders, deleteOrders, listOrders, placeOrder, rejectedOrders, updateStatus, userOrders } from '../controllers/order.controller.js';
import { protectAdmin } from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", placeOrder);
orderRouter.get("/listcar", listOrders);
// orderRouter.get("/completedorders", completedOrders);
orderRouter.get("/acceptedorders", acceptedOrders);
orderRouter.get("/rejectedorders", rejectedOrders);
orderRouter.post("/deleteorders", deleteOrders);
orderRouter.post("/status", updateStatus);
orderRouter.get("/completedorders", protectAdmin, completedOrders);


export default orderRouter;

// import authMiddleware from '../middleware/auth.js'
// orderRouter.post("/userorders", authMiddleware, userOrders);
// orderRouter.post("/place", authMiddleware, placeOrder);
// orderRouter.post("/verify", verifyOrder);
// import express from 'express';
// import authMiddleware from '../middleware/auth.js'
// import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from '../controllers/order.controller.js';

// const orderRouter = express.Router();

// orderRouter.post("/place", authMiddleware, placeOrder);
// orderRouter.post("/verify", verifyOrder);
// orderRouter.post("/userorders", authMiddleware, userOrders);
// orderRouter.get("/list", listOrders);
// orderRouter.post("/status", updateStatus);

// export default orderRouter;