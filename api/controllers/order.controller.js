import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import Stripe from "stripe";
import { sendEmail } from "../emails/OrderConfirmationEmail.controller.js";
import { rejectedOrderEmail} from '../emails/rejectedOrderEmail.js'
import { acceptedOrderEmail } from '../emails/acceptedOrderEmail.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// placing user order from frontend
const placeOrder = async (req, res) => {
    
    // link for frontend url
    const frontend_url = 'http://localhost:5173'
    try {
        // creating new order
        const {userId, items, address, orderDate, orderTime } = req.body;
        const newOrder = new orderModel({
            userId: userId,
            items: items,
            address: address,
            orderDate,
            orderTime
        })
        
        // save new order in mongoDB
        const savedOrder = await newOrder.save();
        res.status(201).json({
            success: true,
            message: 'Order places successfully',
            order: savedOrder
        })

        if (savedOrder) {
            // await sendEmail(newOrder.address)
        }

    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'Place order Error'})
    }
}


// user orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({success: true, data: orders})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "user orders Error"})
        
    }
}

// Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        // const orders = await orderModel.find({});
        const orders = await orderModel.find({status: { $nin: ["Accepted", "Completed", "Rejected"] }});
        res.json({success: true, data: orders})
    } catch (error) {
        res.json({success: false, message: "list orders Error"})
    }
}

// API for updating order status

const updateStatus = async (req, res) => {
    const {orderId, status, comment} = req.body;
    const updates = {};
    try {
        if (req.body.comment !== undefined) updates.comment = req.body.comment;
        if (req.body.status !== undefined) updates.status = req.body.status;
        const result = await orderModel.findByIdAndUpdate(
            orderId,
            {status: status, comment: comment}, 
            { new: true });
        if (result.status === "Rejected") {
            // await rejectedOrderEmail(result)
        } else if (result.status === "Accepted") {
            // await acceptedOrderEmail(result);
        }
        res.json({success: true, message: "Status updated", data: result})
    } catch (error) {
        res.json({success: false, message: "Status update Error"})
    }
}

const completedOrders = async (req, res) => {
    try {
        // Get only orders with status = "Completed"
        const completedOrders = await orderModel.find({status: "Completed"});
        res.json({success: true, data: completedOrders })
    } catch (error) {
        res.json({success: false, message: "Completed orders error", error: error.message})
    }
}

const rejectedOrders = async (req, res) => {
    try {
        // Get only orders with status = "Rejected"
        const completedOrders = await orderModel.find({status: "Rejected"});
        res.json({success: true, data: completedOrders })
    } catch (error) {
        res.json({success: false, message: "Completed orders error", error: error.message})
    }
}

const acceptedOrders = async (req, res) => {
    try {
        // Get only orders with status = "Accepted"
        const completedOrders = await orderModel.find({status: "Accepted"});
        res.json({success: true, data: completedOrders })
    } catch (error) {
        res.json({success: false, message: "Completed orders error",  error: error.message})
    }
}

const deleteOrders = async (req, res) => {
    try {
            await orderModel.findByIdAndDelete(req.body.orderId);
            res.json({success: true, message: 'Task removed'})
        } catch (error) {
            console.log(error);
            res.json({success: false, message: 'Task remove Error'})
        }
}

export {placeOrder, userOrders, listOrders, updateStatus, completedOrders, acceptedOrders, rejectedOrders, deleteOrders}

