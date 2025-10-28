import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// placing user order from frontend
const placeOrder = async (req, res) => {
    // link for frontend url
    const frontend_url = 'http://localhost:5173'
    try {
        // creating new order
        const {userId, items, amount, address } = req.body;
        const newOrder = new orderModel({
            userId: userId,
            items: items,
            amount: amount,
            address: address
        })

        // save new order in mongoDB
        await newOrder.save();

        // empty the user cart
        await userModel.findByIdAndUpdate(userId, {cartData: {}});

        // data for stripe payment
        const line_items = items.map((item) => ({
            price_data: {
                currency: "sek",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        // delivery charges
        line_items.push({
            price_data:{
                currency: "sek",
                product_data: {
                    name: "Delivery charges"
                },
                unit_amount: 2*100
            },
            quantity: 1
        })

        // session for payment success and unsuccessful
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success: true, session_url: session.url})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'Error'})
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success} = req.body

    try {
        if (success=== "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            res.json({success: true, message: "Paid"})
        } else {
            await orderModel.findByIdAndDelete(ordderId)
            res.json({success: false, message: "Not paid"})
        }
    } catch (error) {
        
        console.log(error);
        res.json({success: false, message: "Error"})

        
    }
}

// user orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({success: true, data: orders})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
        
    }
}

export {placeOrder, verifyOrder, userOrders}