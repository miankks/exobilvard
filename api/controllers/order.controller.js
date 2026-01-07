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
      await rejectedOrderEmail(updatedOrder);
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
    const deletedOrder = await orderModel.findByIdAndDelete(req.params.orderId);

    if (!deletedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Delete order Error" });
  }
};
