import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    // userId: {
    //     type: String,
    // },
    items: {
        type: Array, 
        required: true
    },
    status: {
        type: String,
        default: "Pending to accept"
    },
    date: {
        type: Date,
        default: Date.now()
    },
        address: {
        type: Object,
        required: true
    },
    orderDate: {
        type: String
    },
    orderTime: {
        type: String
    }
})

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;


// const orderSchema = new mongoose.Schema({
//     userId: {
//         type: String,
//         required: true,
//     },
//     items: {
//         type: Array, 
//         required: true
//     },
//     amount: {
//         type: Number,
//         required: true
//     },
//     address: {
//         type: Object,
//         required: true
//     },
//     status: {
//         type: String,
//         default: "Väntar att godkänna"
//     },
//     date: {
//         type: Date,
//         default: Date.now()
//     },
//     payment: {
//         type: Boolean,
//         default: false
//     }
// })
