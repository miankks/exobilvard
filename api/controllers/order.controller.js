import orderModel from "../models/order.model.js";
import { sendEmail } from "../emails/OrderConfirmationEmail.controller.js";
import { rejectedOrderEmail } from "../emails/rejectedOrderEmail.js";
import { acceptedOrderEmail } from "../emails/acceptedOrderEmail.js";

// Place new order
export const placeOrder = async (req, res) => {
  try {
    const {
      userId,
      items,
      address,
      orderDate,
      orderTime,
      orderDate1,
      orderTime1,
      orderDate2,
      orderTime2,
      orderDate3,
      orderTime3,
      miltal,
      userComment,
    } = req.body;

    const newOrder = new orderModel({
      userId,
      items,
      address,
      orderDate,
      orderTime,
      orderDate1,
      orderTime1,
      orderDate2,
      orderTime2,
      orderDate3,
      orderTime3,
      miltal,
      userComment,
      status: "Pending to accept",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: savedOrder,
    });

    // Optionally send email
    // await sendEmail(savedOrder.address);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Place order Error" });
  }
};

// Get all orders (single endpoint for all statuses)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Get all orders Error" });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status, comment, acceptedDate } = req.body;

    const updates = {};
    if (status !== undefined) updates.status = status;
    if (comment !== undefined) updates.comment = comment;
    if (acceptedDate !== undefined) updates.acceptedDate = acceptedDate;

    const updatedOrder = await orderModel.findByIdAndUpdate(orderId, updates, {
      new: true,
    });

    // Send emails based on status
    if (updatedOrder.status === "Rejected") {
      // await rejectedOrderEmail(updatedOrder);
    } else if (updatedOrder.status === "Accepted") {
      // await acceptedOrderEmail(updatedOrder);
    }

    res.json({
      success: true,
      message: "Order status updated",
      data: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Update status Error" });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    await orderModel.findByIdAndDelete(req.body.orderId);
    res.json({ success: true, message: "Order deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Delete order Error" });
  }
};

// export const userOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({ userId: req.body.userId });
//     res.json({ success: true, data: orders });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "user orders Error" });
//   }
// };

// import orderModel from "../models/order.model.js";
// // import userModel from "../models/user.model.js";
// // import Stripe from "stripe";
// import { sendEmail } from "../emails/OrderConfirmationEmail.controller.js";
// import { rejectedOrderEmail } from "../emails/rejectedOrderEmail.js";
// import { acceptedOrderEmail } from "../emails/acceptedOrderEmail.js";

// // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// // placing user order from frontend
// const placeOrder = async (req, res) => {
//   // link for frontend url
//   const frontend_url = "http://localhost:5173";
//   try {
//     // creating new order
//     const {
//       userId,
//       items,
//       address,
//       orderDate,
//       orderTime,
//       orderDate1,
//       orderTime1,
//       orderDate2,
//       orderTime2,
//       orderDate3,
//       orderTime3,
//       miltal,
//       userComment,
//     } = req.body;
//     const newOrder = new orderModel({
//       userId: userId,
//       items: items,
//       address: address,
//       orderDate,
//       orderTime,
//       orderDate1,
//       orderTime1,
//       orderDate2,
//       orderTime2,
//       orderDate3,
//       orderTime3,
//       miltal,
//       userComment,
//     });

//     // save new order in mongoDB
//     const savedOrder = await newOrder.save();
//     res.status(201).json({
//       success: true,
//       message: "Order places successfully",
//       order: savedOrder,
//     });

//     if (savedOrder) {
//       // await sendEmail(newOrder.address)
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Place order Error" });
//   }
// };

// // user orders for frontend

// // Listing orders for admin panel
// const listOrders = async (req, res) => {
//   try {
//     // const orders = await orderModel.find({});
//     const orders = await orderModel.find({
//       status: { $nin: ["Accepted", "Completed", "Rejected"] },
//     });
//     res.json({ success: true, data: orders });
//   } catch (error) {
//     res.json({ success: false, message: "list orders Error" });
//   }
// };

// // API for updating order status

// const updateStatus = async (req, res) => {
//   const { orderId, status, comment, acceptedDate } = req.body;
//   const updates = {};
//   try {
//     if (req.body.comment !== undefined) updates.comment = req.body.comment;
//     if (req.body.status !== undefined) updates.status = req.body.status;
//     if (req.body.acceptedDate !== undefined)
//       updates.acceptedDate = req.body.acceptedDate;
//     const result = await orderModel.findByIdAndUpdate(
//       orderId,
//       { status: status, comment: comment, acceptedDate: acceptedDate },
//       { new: true }
//     );
//     if (result.status === "Rejected") {
//       // await rejectedOrderEmail(result)
//     } else if (result.status === "Accepted") {
//       // await acceptedOrderEmail(result);
//     }
//     res.json({ success: true, message: "Status updated", data: result });
//   } catch (error) {
//     res.json({ success: false, message: "Status update Error" });
//   }
// };

// const completedOrders = async (req, res) => {
//   try {
//     // Get only orders with status = "Completed"
//     const completedOrders = await orderModel.find({ status: "Completed" });
//     res.json({ success: true, data: completedOrders });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: "Completed orders error",
//       error: error.message,
//     });
//   }
// };

// const rejectedOrders = async (req, res) => {
//   try {
//     // Get only orders with status = "Rejected"
//     const completedOrders = await orderModel.find({ status: "Rejected" });
//     res.json({ success: true, data: completedOrders });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: "Completed orders error",
//       error: error.message,
//     });
//   }
// };

// const acceptedOrders = async (req, res) => {
//   try {
//     // Get only orders with status = "Accepted"
//     const completedOrders = await orderModel.find({ status: "Accepted" });
//     res.json({ success: true, data: completedOrders });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: "Completed orders error",
//       error: error.message,
//     });
//   }
// };

// const deleteOrders = async (req, res) => {
//   try {
//     await orderModel.findByIdAndDelete(req.body.orderId);
//     res.json({ success: true, message: "Task removed" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Task remove Error" });
//   }
// };

// export {
//   placeOrder,
//   userOrders,
//   listOrders,
//   updateStatus,
//   completedOrders,
//   acceptedOrders,
//   rejectedOrders,
//   deleteOrders,
// };
